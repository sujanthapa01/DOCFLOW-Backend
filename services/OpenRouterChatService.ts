import { IChatService } from "../types/interfaces/chatInterface"
import { ChatMeggage, ChatOptions } from "../types/chat"
import { openAi } from "../lib/aiChatModel"
import { mapMessages } from '../mapper/openAimessage.mapper'


/**
 * 
 * @param model 
 * @param messages 
 * @returns 
 */


// NON Stream Chat Function
const nonStreamChat = async (
    model: string,
    messages: ChatMeggage[]
): Promise<string> => {
    console.log("non stream",model,messages)

    const result = await openAi.chat.completions.create({
        model,
        messages: mapMessages(messages),
    });

console.log("result:",result)
    return result.choices[0].message.content ?? "";
};

// Stream Chat FUnction
const streamChat = async function* (model: string,
    messages: ChatMeggage[]): AsyncIterable<string> {

    const stream = await openAi.chat.completions.create({
        model,
        messages: mapMessages(messages),
        stream: true
    })

    for await (const chunk of stream) {

        const token = chunk.choices[0].delta.content
        if (token) yield token
    }
}



export class OpenRouterChatService implements IChatService {

    async chat(messages: ChatMeggage[],
        options: ChatOptions = {}
    ): Promise<string | AsyncIterable<string>> {

        console.log(options,messages)

        const model = options.model ?? "openai/gpt-4.1-mini"
        const stream = options.stream ?? false


        if (!stream) {
            return nonStreamChat(model, messages)
        }

        return streamChat(model, messages)

    }

}


