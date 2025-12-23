import type {Request , Response } from "express"
import {trpcClient} from "../trpc/trpcClient"
export const mathController =  async (req:Request, res:Response) => {

    const {num1 , num2} = req.body
    try{
        if(!num1 && !num2 ) return res.status(400).json({msg: "enter 2 number"})

            const result = await trpcClient.math.mutate(num1, num2)

    }catch(e) {
        res.status(500).json({error: "internal server er"})
    }
}