import dotenv from "dotenv";
dotenv.config()
import OpenAI from "openai"

export const openRouter = new  OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY!,
     baseURL: "https://openrouter.ai/api/v1",
     defaultHeaders: {
    "HTTP-Referer": "http://localhost:8080", // your app URL
    "X-Title": "My tRPC AI App",
  },

})