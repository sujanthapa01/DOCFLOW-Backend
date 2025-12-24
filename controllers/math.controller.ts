import type {Request , Response } from "express"
import {trpcClient} from "../trpc/trpcClient"

export const mathController =  async (req:Request, res:Response) => {

    const {num1 , num2} = req.body
    console.log(num1,num2)
    try{
        if(!num1 || num1 === 0 && !num2 || num2 === 0 ) return res.status(400).json({msg: "enter 2 number"})

            const result = await trpcClient.math.mutate({num1, num2})
            res.json({result})

    }catch(e) {
        res.status(500).json({error: "internal server er"})
    }
}