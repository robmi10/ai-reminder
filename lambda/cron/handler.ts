import { db } from '@/utils/db/db';
import fetch from 'node-fetch';
import { formatReminderStart } from '@/lib/utils/date';

interface Reminder {
    start: Date;
    desc: string;
    message: string;
    phone: string;
    email: string;
    timeZone: string;
}


const sendSMS = async (checkAllUpcomingReminders: any) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    const smsPromise = checkAllUpcomingReminders.map((reminder: Reminder) => {
        const date = formatReminderStart(reminder.start, reminder.timeZone)

        return client.messages
            .create({
                body: `Reminder: '${reminder.desc}' starts at ${date}. Details and completion: https://www.aireminder.xyz/`,
                to: reminder.phone,
                from: '+18582641195',
            })
            .then((message: any) => console.log(message.sid)).catch((error: any) => console.error("Twilio Error:", error));;
    });
    try {
        const results = await Promise.all(smsPromise);
        return new Response(JSON.stringify({ success: true, results }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
}

const sendEmail = async (checkAllUpcomingReminders: any) => {
    // Mapping over reminders to create an array of fetch promises
    const emailPromises = checkAllUpcomingReminders.map((reminder: any) => {
        const date = formatReminderStart(reminder.start, reminder.timeZone)

        const emailHtml = `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <p>We hope this message finds you well.</p>
            <p>Just a friendly reminder that you have a pending task: <strong>${reminder.desc}</strong>, which is due on <strong>${date}</strong>. Completing tasks on time helps in maintaining progress and achieving your goals efficiently.</p>
            <p>If it’s already on your radar, great! If not, now might be a good time to tackle it. Remember, breaking tasks into smaller steps can make them more manageable.</p>
            <p>Should you need any help or have questions, we’re here for you.</p>
            <p>Best regards,</p>
            <p><strong>AI-Task-Reminder Team</strong></p>
        </div>
        `;

        const emailBody = {
            from: 'AI Task Reminder <onboarding@aireminder.xyz>',
            to: [`${reminder.email}`],
            subject: 'AI Task Reminder',
            html: emailHtml
        };

        return fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.NEXT_RESEND_API_KEY}`,
            },
            body: JSON.stringify(emailBody)
        })
            .then(response => response.json())
            .then((data: any) => {
                if (!data.success) {
                    throw new Error(data.message);
                }
                return data;
            })
            .catch(error => {
                console.error(`Failed to send email to ${reminder.email}:`, error);
                return null;
            });
    });

    try {
        const results = await Promise.all(emailPromises);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Reminder emails sent.", results }),
        };
    } catch (error) {
        console.error("Error in sending emails:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Reminders email error.", error }),
        };
    }
}


export const checkReminder = async () => {
    try {

        const now = new Date().toISOString();
        const checkAllUpcomingReminders = await db.selectFrom('event').where('start', '>=', now).where('reminder', '<=', now).where('status', '=', false).selectAll().execute()

        await Promise.all(checkAllUpcomingReminders.map(async (opts: any) => {
            await db.updateTable('event').where('eventId', '=', opts.eventId).set({ 'status': true }
            ).execute()
        }))

        const hasReminders = checkAllUpcomingReminders?.length > 0

        if (hasReminders) {
            await sendEmail(checkAllUpcomingReminders)
            await sendSMS(checkAllUpcomingReminders)
        }
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Reminders sent." }),
        };

    } catch (error) {
        console.error(error)
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to send reminders." }),
        };
    }
};

export const deleteReminders = async () => {
    try {
        await db.deleteFrom('event').where('status', '=', true).execute();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Reminders deleted." }),
        };
    } catch (error) {
        console.error(error)
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to delete reminders." }),
        };
    }
}