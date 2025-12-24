import type { Request, Response } from "express";
import { trpcClient } from "../trpc/trpcClient";

export const aiChatController = async (req: Request, res: Response) => {
  const { prompt } = req.body;

  console.log("Prompt:", prompt);

  if (!prompt || prompt.trim() === "") {
    return res.status(400).json({ error: "Enter a prompt" });
  }

  try {
    const result = await trpcClient.aiChat.mutate({ prompt });

    return res.json({
      success: true,
      reply: result, // ✅ result is already a string
    });
  } catch (error) {
    console.error("AI Chat Error:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
