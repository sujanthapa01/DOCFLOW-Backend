export type ChatMeggage = {
role : "system" | "user" | "assistant"
content : string
}

export type ChatOptions = {
    model? :string
    stream? :boolean
}