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

    if (!message || Array.isArray(message)) {
        res.json({ msg: "messssge is required" })
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
            res.write(`$data : ${token} \n\n`)
        }

        return res.end()

    }

    try {

        const res = await chatService.chat(message, {
            stream: stream,
            model: model
        })




    } catch (error) {

        throw new Error("internal server error ''aiChat COntroller''")

    }


}