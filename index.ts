import dotenv from "dotenv";
dotenv.config();

import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpcRouters/_app";
import type { AppRouter } from "./trpcRouters/_app";
import Route from "./routes/routes";
import {serverAdapter} from "./queue/queueDashboard"



const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "OPTIONS"],
  })
);

// Health check
app.get("/health", (_, res) => res.status(200).json({ status: "ok" }));

// tRPC
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware<AppRouter>({
    router: appRouter,
  })
);

// REST API
app.use("/api", Route);



app.use("/admin/queues", serverAdapter.getRouter());

// Global error handler
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📊 Bull Board: http://localhost:${PORT}/admin/queues`);
});
