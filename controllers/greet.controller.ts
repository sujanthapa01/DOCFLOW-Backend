import type {Request , Response } from "express"
import {trpcClient} from "../trpc/trpcClient"

export const greetController = async (req:Request, res:Response) => {
    try {
        const {input} = req.body;
        console.log(input)
        if(!input) return res.status(400).json({error: "Name is Required!" })
            const result = await trpcClient.greet.query(input)
             res.json({result})

    }catch(e){
        console.log(e)
    }
}