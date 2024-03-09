import { createTRPCRouter, protectedProcedure } from "@/server/trpc";
import { z } from "zod";
import Replicate from "replicate";

export const aiRouter = createTRPCRouter({
    generateText: protectedProcedure.input(
        z.object({ audio: z.string() })
    ).mutation(async (opts) => {
        console.log("inside generateText now here", opts.input.audio)
        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
        });

        const output = await replicate.run(
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
        console.log(output);

        const text = output?.transcription
        return text
    })
})