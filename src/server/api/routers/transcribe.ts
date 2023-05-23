import { any, record, z } from "zod";
// import { ethers } from "ethers";
import fs from 'fs';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { Configuration, OpenAIApi } from "openai";
import { env } from "~/env.mjs";

const configuration = new Configuration({
  apiKey: env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);



export const transcribeRouter = createTRPCRouter({



  transcribe: protectedProcedure
    .input(
        // z.custom<File>((file) => file instanceof File)
    //  z.instanceof(File)
    z.custom<File>()
    )
    .mutation(async ({ ctx, input }) => {

      await ctx.prisma.$transaction(async (tx) => {
        const sender = await tx.user.update({
          data: {
            credits: {
              decrement: 10,
            },
          },
          where: {
            id: ctx.session.user.id,
          },
        });

      });

   
      const response = openai.createTranscription(input, 'whisper-1');
    //   console.log(response.data);
    //   return response.data;
    }),
});
