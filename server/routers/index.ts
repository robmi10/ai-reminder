import { createTRPCRouter } from "../trpc";
import { aiRouter } from "./reminder";

export const appRouter = createTRPCRouter({
    ai: aiRouter
});

export type AppRouter = typeof appRouter;
