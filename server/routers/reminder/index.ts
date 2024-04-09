import { createTRPCRouter, protectedProcedure } from "@/server/trpc";
import { z } from "zod";
import OpenAI from 'openai';
import { db } from "@/utils/db/db";
import { format } from "date-fns";
import Replicate from 'replicate';

const client = new OpenAI({
    apiKey: process.env.TOGETHER_API_KEY,
    baseURL: 'https://api.together.xyz/v1',
});

export const aiRouter = createTRPCRouter({
    generateText: protectedProcedure.input(
        z.object({ audio: z.string(), user: z.any() })
    ).mutation(async (opts) => {
        console.log("inside generateText now here", opts.input.audio)

        const userId = opts.input.user?.id
        const email = opts.input.user?.emailAddresses[0].emailAddress

        console.log("inside input userId ->", userId)
        console.log("inside input email ->", email)

        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
        });

        const output: any = await replicate.run(
            "openai/whisper:4d50797290df275329f202e48c76360b3f22b08d28c196cbc54600319435f8d2",
            {
                input: {
                    audio: opts.input.audio,
                    model: "large-v3",
                    translate: false,
                    temperature: 0,
                    transcription: "plain text",
                    suppress_tokens: "-1",
                    logprob_threshold: -1,
                    no_speech_threshold: 0.6,
                    condition_on_previous_text: true,
                    compression_ratio_threshold: 2.4,
                    temperature_increment_on_fallback: 0.2
                }
            }
        );

        const text = output.transcription
        console.log("text ->", text)
        // \n\nFor tasks without a specified 'time', you can omit the 'time' and 'reminder' fields. The AI should apply the default reminder time only to tasks with a specified 'time'.
        const response = await client.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: `Convert the spoken text into structured task reminders as JSON objects.
                    Each task should include 'task' (a brief description), 'date' (YYYY-MM-DD), 'time' (HH:MM in 24-hour format), and 'reminder' (minutes before the task).
                    If a task mentions a relative time (like "in 2 hours"), calculate the date and time accordingly using the current time as the reference point. Today's date is ${new Date().toISOString().split('T')[0]}, and the current time is ${new Date().toLocaleTimeString('en-US', { hour12: false })}.
                    If a task does not specify a date, use the most recently mentioned date in the text. If no date is mentioned, use today's date (${new Date().toISOString().split('T')[0]}).
                    If a task does not specify a reminder time, use the most recently mentioned reminder time in the text. If no reminder time is mentioned at all, set the reminders to 10 minutes before the task's start time.
                    Ensure the output is formatted as follows:\n\n{ 'task': 'Task description', 'date': 'YYYY-MM-DD', 'time': 'HH:MM', 'reminder': 'HH:MM'}`
                },
                {
                    role: 'user',
                    content: text
                }
            ], model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        })

        const reminder = response.choices[0].message.content
        console.log("reminder ->", reminder)
        const reminderList = reminder && (reminder.length > 0 ? JSON.parse(reminder) : reminder)

        console.log("reminderList ->", reminderList)
        console.log("reminderList.length ->", reminderList.length)
        if (reminderList) {
            try {
                const usageDate = new Date();
                if (reminderList.length > 0) {
                    await Promise.all(reminderList.map(async (opt: any) => {
                        console.log("opt in array ->", opt)
                        const startDateTimeISO = `${opt.date}T${opt.time}:00`;
                        const reminderTimeISO = `${opt.date}T${opt.reminder}:00`;
                        const startDateTime = new Date(startDateTimeISO);
                        const reminderTime = new Date(reminderTimeISO);

                        console.log("startDateTimeISO ->", startDateTimeISO)
                        console.log("startDateTime ->", startDateTime)
                        console.log("reminderTime ->", reminderTime)
                        await db.insertInto('event').values({
                            userId: userId,
                            desc: opt.task,
                            start: startDateTime.toISOString(),
                            reminder: reminderTime.toISOString(),
                            email: email,
                            phone: "0707276369",
                        }).execute()

                    }));
                } else {
                    console.log("reminderList in array ->", reminderList)
                    const startDateTimeISO = `${reminderList.date}T${reminderList.time}:00`;
                    const reminderTimeISO = `${reminderList.date}T${reminderList.reminder}:00`;
                    const startDateTime = new Date(startDateTimeISO);
                    const reminderTime = new Date(reminderTimeISO);

                    console.log("startDateTimeISO ->", startDateTimeISO)
                    console.log("startDateTime ->", startDateTime)
                    console.log("reminderTime ->", reminderTime)
                    await db.insertInto('event').values({
                        userId: userId,
                        desc: reminderList.task,
                        start: startDateTime.toISOString(),
                        reminder: reminderTime.toISOString(),
                        email: email,
                        phone: "0707276369",
                    }).execute()
                }

                await db.insertInto('reminder_usage').values({
                    userId: userId,
                    date: usageDate.toISOString(),
                }).execute()
                console.log('All reminders have been inserted successfully.');

            } catch (error) {
                console.error(error)
            }

        }
        return { reminder, text }
    }),
    getUserReminders: protectedProcedure.input((z.object({ user: z.any() }))).query(async (opts) => {
        const userId = opts.input.user?.id
        const reminders = await db.selectFrom('event').selectAll().where('userId', '=', userId).orderBy('start asc').execute()
        return reminders
    }),

    isRemindersUsageAcceptable: protectedProcedure.input((z.object({ user: z.any() }))).query(async (opts) => {
        const userId = opts.input.user?.id
        const dailyLimit = 2;

        const today = new Date();
        const todayFormatted = today.toISOString().split('T')[0];

        const reminderUsage = await db.selectFrom('reminder_usage').selectAll().where('userId', '=', userId).where('date', '=', todayFormatted).execute()
        const usageLengthToday = reminderUsage.length;
        return usageLengthToday >= dailyLimit
    }),
    deleteReminder: protectedProcedure.input((z.object({ eventId: z.number() }))).mutation(async (opts) => {
        console.log("eventId delete ->", opts.input.eventId)
        await db.deleteFrom('event').where('eventId', '=', opts.input.eventId).execute()
    }),
    insertPhoneNumber: protectedProcedure.input((z.object({ phone: z.string(), user: z.any() }))).mutation(async (opts) => {
        const userId = opts.input.user?.id
        await db.updateTable('event').where('userId', '=', userId).set(
            { phone: opts.input.phone }
        ).execute()
    }),
    editReminder: protectedProcedure.input((z.object({ eventId: z.number(), desc: z.string().optional(), timeStart: z.string(), timeReminder: z.string() }))).mutation(async (opts) => {
        const updatePayload = { desc: '', start: '', reminder: '' };

        const mergeDateTime = (currentDateTime: string, newTime: string) => {
            const dateObj = new Date(currentDateTime);
            const datePart = format(dateObj, 'yyyy-MM-dd');
            return `${datePart} ${newTime}:00+00`;
        };

        const currentEventDetails = await db.selectFrom('event').selectAll().where('eventId', '=', opts.input.eventId).execute();

        updatePayload.desc = opts.input.desc ? opts.input.desc : currentEventDetails[0].desc;
        updatePayload.start = opts.input.timeStart ? mergeDateTime(currentEventDetails[0].start.toString(), opts.input.timeStart) : currentEventDetails[0].start;
        updatePayload.reminder = opts.input.timeReminder ? mergeDateTime(currentEventDetails[0].reminder.toString(), opts.input.timeReminder) : currentEventDetails[0].reminder;

        await db.updateTable('event').where('eventId', '=', opts.input.eventId).set(
            updatePayload
        ).execute()
    }),

})