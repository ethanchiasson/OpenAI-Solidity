import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const GITHUB_BASE_URL = "https://api.github.com/";

export const userRouter = createTRPCRouter({

  getCredits: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    
    return user?.credits;
  }),
  
});