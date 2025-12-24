import {publicProcedure} from "../trpc/trpc"
import z from "zod"
import {aiModule} from "../helpers/aiModule"


export const aiChatProcedure =   publicProcedure.input(z.object({
prompt: z.string()
})).mutation(async ({input}) => {

const reply = aiModule(input.prompt)
return reply


})