import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { userRouter } from "~/server/api/routers/user";
import { auditRouter } from "~/server/api/routers/audit";
import { checkoutRouter } from "./routers/checkout";
import { transcribeRouter } from "./routers/transcribe";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  user: userRouter,
  audit: auditRouter,
  checkout: checkoutRouter,
  transcribe: transcribeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
