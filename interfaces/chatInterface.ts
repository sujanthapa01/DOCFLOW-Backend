import {ChatMeggage,ChatOptions} from "../types/chat"

export interface IChatService {

    chat (
        meggage : ChatMeggage[],
        options? : ChatOptions
    ): Promise<string | AsyncIterable<string>>
}