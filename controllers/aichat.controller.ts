import type { Request, Response } from "express"

export const aiChatController = (req: Request,res:Response) => {
    
    const {prompt} = req.body
    try{
        



    }catch(error){

        throw new Error("internal server error ''aiChat COntroller''")

    }


}