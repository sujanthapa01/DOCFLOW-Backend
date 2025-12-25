import {publicProcedure} from "../trpc/trpc"
import z from "zod"



export const pdfProcedure =  publicProcedure.input(z.object({
prompt: z.string()
})).mutation(async ({input}) => {

return "pdfprocedure"
})