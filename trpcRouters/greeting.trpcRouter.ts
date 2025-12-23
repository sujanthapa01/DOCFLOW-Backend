import {publicProcedure} from "../trpc/trpc"
import z from "zod"


export const greet = publicProcedure.input(z.string()).query(({input})=> {
    console.log(input)
    return `hii ${input}, trpc server is up and running`
})