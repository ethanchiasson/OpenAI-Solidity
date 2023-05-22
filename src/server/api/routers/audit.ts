import { z } from "zod";
// import { ethers } from "ethers";

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

// export const config = {
//   runtime: 'edge',
// };

export const auditRouter = createTRPCRouter({

  
  auditContract: protectedProcedure
    .input(
      z.object({
        userMessage: z.string(),
      })
    )
    .mutation(async ({ ctx, input: { userMessage } }) => {
      // let abi;
      let code;
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

        if (sender.credits > 0) {
          throw new Error("Not enough credits");
        }

        //   const address = '0x5Af0D9827E0c53E4799BB226655A1de152A425a5';
        //   const address = '0xFc7a5BD22dFc48565D6f04698E566Dd0C71d3155';

        // const address = userMessage;
        // const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apiKey=${env.ETHERSCAN_API_KEY}`;

        // const url = `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${address}&apiKey=${env.ETHERSCAN_API_KEY}`;

        // const response = await fetch(url);
        // const data = await response.json();
        // let abi;
        // if (data.result == undefined) {
        //   throw new Error(
        //     "Cannot find contract. Please check your formatting."
        //   );
        // } else {
        //   abi = data.result;
        // }

        // abi = data.result;
        code = userMessage;
        // console.log(data.result[0]['SourceCode']);
      });

      const expandedPrompt = `
      You are a code generator. Your job is to generate solidity code that meets the technical and functional requirements of the user's request given here: ${code}.
      
      The generated response must be entirely written and formatted in Solidity only. Do not include any generated text that is not Solidity code. Do not give an explination for your code.`;


      
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0,
        max_tokens: 2000,
        messages: [
          {
            role: "user",
            content: userMessage,
          },
          {
            role: "system",
            content: expandedPrompt,
          },
        ],
      });

      console.log(response.data);
      return response.data;
    }),
});
