import { createTRPCRouter } from "../trpc";
import { aiRouter } from "./ai";
import { eventRouter } from "./event";

export const appRouter = createTRPCRouter({
    event: eventRouter,
    ai: aiRouter
});

export type AppRouter = typeof appRouter;
