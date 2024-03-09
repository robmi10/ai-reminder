import { createTRPCRouter, protectedProcedure } from "@/server/trpc";
import { z } from "zod";
import Replicate from "replicate";

const blobSchema = z.object({
    size: z.number(),
    type: z.string()
});


export const aiRouter = createTRPCRouter({
    generateText: protectedProcedure.input(z.object({
        audio: blobSchema
    })).mutation(async (opts) => {

        console.log("inside generateText now here", opts.input.audio)
        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
        });

        console.log("replicate ->", replicate)
        console.log("audio ->", opts.input.audio)



    })
})