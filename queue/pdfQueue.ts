import IORedis from "ioredis"
import {Queue} from "bullmq"

const redis = new IORedis({
     host: "localhost",
    port: 6379
})

export  const pdfQueue = new Queue("pdf-processing",{connection : redis})