import {router } from "../trpc/trpc"
import {pdfProcedure} from "./pdf.trpc"

export const appRouter = router({
uploadPdf : pdfProcedure
})


export type AppRouter = typeof appRouter