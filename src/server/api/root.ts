import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import {userRouter} from "~/server/api/routers/user"
import {githubRouter} from "~/server/api/routers/github"
import { auditRouter } from "~/server/api/routers/audit";
import { checkoutRouter } from "./routers/checkout";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  user: userRouter,
  github: githubRouter,
  audit: auditRouter,
  checkout: checkoutRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
