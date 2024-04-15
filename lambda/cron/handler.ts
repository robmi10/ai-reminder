import EmailTemplate from '@/app/components/email';
import { db } from '@/utils/db/db';
import { Resend } from 'resend';
import { format } from 'date-fns';

interface Reminder {
    start: Date;
    desc: string;
    message: string;
    phone: string;
    email: string;
}
const sendSMS = async (checkAllUpcomingReminders: any) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);


    console.log("check process.env.TWILIO_AUTH_TOKEN ->", process.env.TWILIO_AUTH_TOKEN)

    const smsPromise = checkAllUpcomingReminders.map((reminder: Reminder) => {
        const date = new Date(reminder.start.toString());

        console.log(`Sending SMS to ${reminder.phone}`);

        return client.messages
            .create({
                body: `Reminder: '${reminder.desc}' starts at ${format(date, "EEEE, MMMM do, yyyy 'at' HH:mm")}. Details and completion: https://www.aireminder.xyz/`,
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

// const sendEmail = async (checkAllUpcomingReminders: any) => {
//     if (typeof global.Headers === 'undefined') {
//         const fetch = require('node-fetch');
//         global.Headers = fetch.Headers;
//         global.Request = fetch.Request;
//         global.Response = fetch.Response;
//     }
//     const resend = new Resend(process.env.NEXT_RESEND_API_KEY);

//     console.log("check process.env.NEXT_RESEND_API_KEY ->", process.env.NEXT_RESEND_API_KEY)
//     const emailPromises = checkAllUpcomingReminders.map((reminder: Reminder) => {
//         const date = new Date(reminder.start.toString());
//         return resend.emails.send({
//             from: 'AI Task Reminder <onboarding@resend.dev>',
//             to: [`${reminder.email}`],
//             subject: "AI Task Reminder",
//             react: EmailTemplate({ reminder: reminder.desc, dueDate: format(date, "EEEE, MMMM do, yyyy 'at' HH:mm") }) as React.ReactElement,
//         }).then(response => console.log(`Email sent successfully: ${response}`))
//             .catch(error => console.error(`Failed to send email: ${error}`));;
//     });
//     try {
//         const results = await Promise.all(emailPromises);
//         return new Response(JSON.stringify({ success: true, results }), { status: 200 });
//     } catch (error) {
//         return new Response(JSON.stringify({ error: error }), { status: 500 });
//     }
// }

export const checkReminder = async () => {
    try {
        const now = new Date().toISOString();
        const checkAllUpcomingReminders = await db.selectFrom('event').where('start', '>=', now).where('reminder', '<=', now).where('status', '=', false).selectAll().execute()

        await Promise.all(checkAllUpcomingReminders.map(async (opts: any) => {
            await db.updateTable('event').where('eventId', '=', opts.eventId).set({ 'status': true }
            ).execute()
        }))

        const hasReminders = checkAllUpcomingReminders?.length > 0

        console.log("hasReminders -> ", hasReminders)

        if (hasReminders) {
            console.log("inside hasReminders now")
            // await sendEmail(checkAllUpcomingReminders)
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