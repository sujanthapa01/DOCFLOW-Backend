import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: "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",
  baseURL:"https://openrouter.ai/api/v1",
  defaultHeaders:{
    "HTTP-Referer": "http://localhost:8080",
    "X-Title": "AI PDF Backend"
  }
})

export const embedText = async (chunks:string[]) => {
    const embeddings: number[][] = []

    for(const chunk of chunks){
        const res = await openai.embeddings.create({
            model:"text-embedding-3-small",
            input:chunk
        })

        embeddings.push(res.data[0].embedding)
    }
    return embeddings
}