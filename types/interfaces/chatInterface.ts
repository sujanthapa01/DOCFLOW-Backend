import {ChatMeggage,ChatOptions} from "../chat"

export interface IChatService {

    chat (
        meggage : ChatMeggage[],
        options? : ChatOptions
    ): Promise<string | AsyncIterable<string>>
}