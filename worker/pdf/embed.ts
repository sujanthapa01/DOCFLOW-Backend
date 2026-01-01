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