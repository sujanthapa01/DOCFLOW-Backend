import "dotenv/config";
import IORedis from "ioredis";
import { Worker } from "bullmq";
import { extractText } from "./pdf/extract_text.ts";
import { cleanText } from "./pdf/cleanText.ts";
import { chunkText } from "./pdf/chunkText.ts";
import { embedText } from "./pdf/embed.ts";
import { v4 as uuidv4 } from "uuid"
import { client as qdrant } from "./qdrant/client.ts"

const redis = new IORedis({
  host: "127.0.0.1",
  port: 6379,
  maxRetriesPerRequest: null,
});
console.log("hii");

const worker = new Worker(
  "pdf-processing",
  async (job) => {
    console.log(job.id, job.data.filename);

    const buffer = Buffer.from(job.data.buffer, "base64");

    // Extract Text
    const text = await extractText(buffer);
    // clean the text
    const cleaned_text = cleanText(text);

    // chunk
    const chunks = chunkText(cleaned_text);

    //Embeddings
    const embeddings = await embedText(chunks);

    //store embeddings in Qdrant

    const points = chunks.map((chunk, i) => ({
      id: uuidv4(),
      vector: embeddings[i],
      payload: {
        text: chunk,
        filename: job.data.filename,
        userid: job.data.userid
      }
    }));

    console.log(points)

    await qdrant.upsert("pdf_chunks", {
      wait: true,
      points
    })

    return{chunks: chunks.length}

  },
  {
    connection: redis,
  }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed`, err);
});
