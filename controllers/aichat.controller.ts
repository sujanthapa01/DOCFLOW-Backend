import type { Request, Response } from "express"
import { OpenRouterChatService } from "../services/OpenRouterChatService"
import { ChatMeggage } from "../types/chat"

// Chat Service Instence
const chatService = new OpenRouterChatService()

export const aiChatController = async (req: Request, res: Response) => {

    const { message, stream, model } = req.body as {
        message: ChatMeggage[],
        stream?: boolean,
        model?: string
    }

    console.log(message,stream,model)

    if (!message || !Array.isArray(message) || message.length === 0) {
      return  res.json({ msg: "messssge is required" })
    }


    if (stream) {
        res.setHeader("Content-type", "text/event-stream ")
        res.setHeader("Cache-controll", "no-cache")
        res.setHeader("Connection", "keep-alive")

        const streamResponse = await chatService.chat(message, {
            model: model,
            stream: true
        })

        for await (const token of streamResponse as AsyncIterable<string>) {
            res.write(`data : ${token} \n\n`)
        }

        return res.end()

    }

    try {

        const response = await chatService.chat(message, {
            stream: stream,
            model: model
        })

       return res.json(response)



    } catch (error) {

      return res.status(500).json({error: "Internal Server Error aiChat Controller"})

    }


}