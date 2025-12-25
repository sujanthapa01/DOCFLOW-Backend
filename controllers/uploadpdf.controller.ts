import type { Request, Response } from "express"
import { pdfQueue } from "../queue/pdfQueue"

export const pdfController = async (req: Request, res: Response) => {
    const {file} = req.body
    console.log(file)
    console.log("pdf-controller")
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "PDF upload is required"
      })
    }

    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({
        success: false,
        message: "Only PDF files are allowed"
      })
    }

    const job = await pdfQueue.add(
      `processing ${req.file.originalname}`,
      {
        filename: req.file.originalname,
        buffer: req.file.buffer.toString("base64"),
        userId: req.body.userId || null,
        createdAt: Date.now()
      },
      {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 5000
        },
        removeOnComplete: true,
        removeOnFail: false
      }
    )

    return res.status(200).json({
      success: true,
      jobId: job.id,
      message: `${req.file.originalname} queued for processing`
    })

  } catch (error) {
    console.error("PDF upload failed:", error)

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    })
  }
}
