import {publicProcedure} from "../trpc/trpc";
import z from "zod"

export const mathRoute = publicProcedure.input(z.object({
    num1 : z.number(),
    num2: z.number()

})).mutation(({input}) => {
   const additon = input.num1 + input.num2 
   return additon
})