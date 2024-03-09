import { createTRPCRouter, protectedProcedure } from "@/server/trpc";
import { z } from "zod";

export const eventRouter = createTRPCRouter({
    createEvent: protectedProcedure.input(z.object({
    })).mutation(async (opts) => {

    })
})