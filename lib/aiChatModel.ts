import OpenAI from "openai";


export const openAi = new OpenAI({
    apiKey: "",
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders : {
    "HTTP-Referer": "httpL//localhost:80880",
    "X-Tittle" :"DocFLow Backend" 
    }
})



