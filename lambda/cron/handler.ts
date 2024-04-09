import EmailTemplate from '@/app/components/email';
import { db } from '@/utils/db/db';
import { Resend } from 'resend';
import { format } from 'date-fns';

const sendSMS = async (checkAllUpcomingReminders: any) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    const client = require('twilio')(accountSid, authToken);

    console.log("inside sendSMS 2", client)

    const smsPromise = checkAllUpcomingReminders.map(reminder => {
        const date = new Date(reminder.start.toString());

        console.log("inside sendSMS 3", reminder.phone)
        return client.messages
            .create({
                body: `Reminder: '${reminder.desc}' starts at ${format(date, "EEEE, MMMM do, yyyy 'at' HH:mm")}. Details and completion: http://localhost:3000/`,
                to: reminder.phone,
                from: '+18582641195',
            })
            .then((message: any) => console.log(message.sid)).catch((error: any) => console.error("Twilio Error:", error));;
    });
    try {
        const results = await Promise.all(smsPromise);
        console.log("results sms ->", results)
        return new Response(JSON.stringify({ success: true, results }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
}

const sendEmail = async (checkAllUpcomingReminders: any) => {
    const resend = new Resend(process.env.NEXT_RESEND_API_KEY);
    const emailPromises = checkAllUpcomingReminders.map(reminder => {
        const date = new Date(reminder.start.toString());
        return resend.emails.send({
            from: 'AI Task Reminder <onboarding@resend.dev>',
            to: [`${reminder.email}`],
            subject: "AI Task Reminder",
            react: EmailTemplate({ reminder: reminder.desc, dueDate: format(date, "EEEE, MMMM do, yyyy 'at' HH:mm") }) as React.ReactElement,
        });
    });
    try {
        const results = await Promise.all(emailPromises);
        console.log("results email ->", results)
        return new Response(JSON.stringify({ success: true, results }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
}

export const checkReminder = async () => {
    try {

        const now = new Date();
        const isUpcomingReminding = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes());

        const startOfMinute = isUpcomingReminding;
        const endOfMinute = new Date(startOfMinute.getTime() + 60000);
        const checkAllUpcomingReminders = await db.selectFrom('event').where('reminder', '>=', startOfMinute).where('reminder', '<', endOfMinute).selectAll().execute()
        await sendEmail(checkAllUpcomingReminders)
        await sendSMS(checkAllUpcomingReminders)
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
        const now = new Date();
        await db.deleteFrom('event').where('start', '<', now).execute();
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