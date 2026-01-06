import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();


export const openAi = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders : {
    "HTTP-Referer": "httpL//localhost:80880",
    "X-Tittle" :"DocFLow Backend" 
    }
})



