import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const GITHUB_BASE_URL = "https://api.github.com/";

export const githubRouter = createTRPCRouter({

  getUserGithub: protectedProcedure.query(async ({ ctx }) => {
  
    const account = await ctx.prisma.account.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
     include: {
      user: true
     }
    })

    const accessToken = account?.access_token;
    
    console.log("AT ->", accessToken);
    
    const response = await fetch(`https://api.github.com/user`, {
      headers: {'Authorization': `Bearer ${account?.access_token}`,}
    });

    const userData = response.json()

    console.log("AT ->", accessToken);
    console.log(account)
    console.log(userData)
    // console.log(userData)
    return userData;
    // return account;
  }),
  
});