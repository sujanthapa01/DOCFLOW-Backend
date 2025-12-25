import { Router } from "express";
import {pdfController} from "../controllers/uploadpdf.controller"
import {memoryUpload} from "../config/multerConfig"

const route = Router()

route.post("/upload",memoryUpload.single("pdf") ,pdfController)
route.get("/health", (_, res) => {
  res.status(200).json({ status: "ok" })
})

export default route