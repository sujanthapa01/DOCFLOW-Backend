import dotenv from "dotenv";
dotenv.config()
import express from "express"
import type {Request, Response} from "express"
import cors from "cors"
import * as trpcExpress from "@trpc/server/adapters/express"
import {appRouter} from "./trpcRouters/_app"
import type {AppRouter} from "./trpcRouters/_app"
import mathRoute from "./routes/math.route.ts"
import greetRoute from "./routes/greet.route.ts"
import aiChatRoute from "./routes/aichat.route.ts"

const app = express()
app.use(express.json())

app.use(cors({ 
    origin: "http://localhost:3000" ,
    methods: ["POST"]}))


app.use("/trpc", trpcExpress.createExpressMiddleware<AppRouter>({
router: appRouter
}))

app.use("/greet", greetRoute)

app.use("/math", mathRoute)
app.use("/aichat", aiChatRoute)




app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`)
})