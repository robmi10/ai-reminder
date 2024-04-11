import EmailTemplate from '@/app/components/email';
import { db } from '@/utils/db/db';
import { Resend } from 'resend';
import { format } from 'date-fns';

const sendSMS = async (checkAllUpcomingReminders: any) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    const smsPromise = checkAllUpcomingReminders.map(reminder => {
        const date = new Date(reminder.start.toString());

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
        return new Response(JSON.stringify({ success: true, results }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error }), { status: 500 });
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

        console.log("inside checkReminder !", checkAllUpcomingReminders)
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
        const now = new Date();
        await db.deleteFrom('event').where('status', '==', true).execute();
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