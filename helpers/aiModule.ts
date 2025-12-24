import {openRouter} from "../lib/openRouter"

export const aiModule = async (prompt: any) => {
     const response = await openRouter.chat.completions.create({
        model: "openai/gpt-4o-mini", 
        messages: [
          { role: "system", content: "You are a helpful AI assistant." },
          { role: "user", content: prompt },
        ],
      });

      console.log(response.choices[0].message.content
)

      return response.choices[0].message.content
}