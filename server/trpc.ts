import { TRPCError, initTRPC } from "@trpc/server";
import { getAuth, SignedInAuthObject, SignedOutAuthObject } from '@clerk/nextjs/server';

// interface AuthContext {
//     auth: SignedInAuthObject | SignedOutAuthObject;
// }

export async function createInnerContext(req: any) {
    return await { auth: getAuth(req) };
}

export type Context = Awaited<ReturnType<typeof createInnerContext>>;

const t = initTRPC.context<Context>().create();
export const router = t.router;
export const publicProcedure = t.procedure;
export const createTRPCRouter = t.router;

const isUserAuthed = t.middleware(({ ctx, next }) => {
    if (!ctx.auth.userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
        ctx: {
            auth: ctx.auth
        },
    });
});

export const protectedProcedure = t.procedure.use(isUserAuthed);