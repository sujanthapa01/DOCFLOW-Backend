import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import {ChatMeggage} from '../types/chat'


export function mapMessages(messages : ChatMeggage[]): ChatCompletionMessageParam[]{
 
    return messages.map((m) => ({
        role : m.role,
        content : m.content
    }))
}