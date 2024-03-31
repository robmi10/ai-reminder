import { createTRPCRouter, protectedProcedure } from "@/server/trpc";
import { z } from "zod";
import Replicate from "replicate";
import OpenAI from 'openai';
import { db } from "@/utils/db/db";
import { format } from "date-fns";
import fs from "fs";
import axios from 'axios'
import path from "path";

const client = new OpenAI({
    apiKey: process.env.TOGETHER_API_KEY,
    baseURL: 'https://api.together.xyz/v1',
});


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function downloadFile(fileUrl: any, outputPath: any) {
    try {
        const response = await axios({
            method: 'GET',
            url: fileUrl,
            responseType: 'stream',
        });

        const writer = fs.createWriteStream(outputPath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    } catch (error) {
        console.error('Error downloading the file: ', error);
    }
}

export const aiRouter = createTRPCRouter({
    generateText: protectedProcedure.input(
        z.object({ audio: z.string() })
    ).mutation(async (opts) => {
        console.log("inside generateText now here", opts.input.audio)

        // const replicate = new Replicate({
        //     auth: process.env.REPLICATE_API_TOKEN,
        // });

        // const output: any = await replicate.run(
        //     "openai/whisper:4d50797290df275329f202e48c76360b3f22b08d28c196cbc54600319435f8d2",
        //     {
        //         input: {
        //             audio: opts.input.audio,
        //             model: "large-v3",
        //             translate: false,
        //             temperature: 0,
        //             transcription: "plain text",
        //             suppress_tokens: "-1",
        //             logprob_threshold: -1,
        //             no_speech_threshold: 0.6,
        //             condition_on_previous_text: true,
        //             compression_ratio_threshold: 2.4,
        //             temperature_increment_on_fallback: 0.2
        //         }
        //     }
        // );

        const fixedOutputPath = path.resolve(__dirname, 'downloadedAudio.wav');

        await downloadFile(opts.input.audio, fixedOutputPath)

        const translation = await openai.audio.translations.create({
            file: fs.createReadStream(fixedOutputPath),
            model: "whisper-1",
        });

        console.log("check translation ->", translation)

        const text = translation.text

        const response = await client.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: `Convert the text into structured task reminders as JSON objects. 
                    For each task, include 'task' (a brief description), 'date' (YYYY-MM-DD), 'time' (HH:MM in 24-hour format), and 'reminder' (minutes before the task).
                    Use today's date (${new Date().toISOString().split('T')[0]}) for relative references. 
                    Ensure the output follows this format:\n\n{\n  'task': 'Example task',\n  'date': 'YYYY-MM-DD',\n  'time': 'HH:MM',\n  'reminder': 'minutes before'\n}\n\nExtract and structure the task details from the input text accordingly.
                    If you don't find a reminder for a task use the latest reminder otherwise set a reminder 10 minnutes before time`
                },
                {
                    role: 'user',
                    content: text
                }
            ], model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        })

        const reminder = response.choices[0].message.content
        console.log("reminder ->", reminder)
        const reminderList = reminder && JSON.parse(reminder)

        console.log("reminderList ->", reminderList)
        if (reminderList) {
            try {
                await Promise.all(reminderList.map(async (opt: any) => {
                    console.log("opt in array ->", opt)
                    const startDateTimeISO = `${opt.date}T${opt.time}:00`; // Assuming 'time' doesn't include seconds
                    const startDateTime = new Date(startDateTimeISO);
                    const reminderTime = new Date(startDateTime.getTime() - (opt.reminder * 60000)); // 60000 ms in a minute

                    console.log("startDateTimeISO ->", startDateTimeISO)
                    console.log("startDateTime ->", startDateTime)
                    console.log("reminderTime ->", reminderTime)

                    await db.insertInto('event').values({
                        userId: 1,
                        desc: opt.task,
                        start: startDateTime.toISOString(),
                        reminder: reminderTime.toISOString(),
                        status: false,
                        email: 'robelmichael102@gmail.com',
                        phone: "0707276369",
                    }).execute()
                }));
                console.log('All reminders have been inserted successfully.');

            } catch (error) {
                console.error(error)
            }
        }
        return { reminder, text }
    }),
    getUserReminders: protectedProcedure.input((z.object({ userId: z.number() }))).query(async (opts) => {
        const reminders = await db.selectFrom('event').selectAll().where('userId', '=', opts.input.userId).orderBy('start asc').execute()
        return reminders
    }),
    setReminderStatus: protectedProcedure.input((z.object({ eventId: z.number(), status: z.boolean() }))).mutation(async (opts) => {
        await db.updateTable('event').where('eventId', '=', opts.input.eventId).set({
            status: opts.input.status
        }).execute()
    }),
    deleteReminder: protectedProcedure.input((z.object({ eventId: z.number() }))).mutation(async (opts) => {
        console.log("eventId delete ->", opts.input.eventId)
        await db.deleteFrom('event').where('eventId', '=', opts.input.eventId).execute()
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