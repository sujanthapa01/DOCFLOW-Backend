import IORedis from "ioredis"
import {Queue} from "bullmq"

const redis = new IORedis()

export  const pdfQueue = new Queue("pdf-processing",{connection : redis})