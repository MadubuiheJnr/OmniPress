import express, { type Request, type Response } from "express";
import cors from "cors";
import { env } from "./config/env.js";

const app = express();

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  }),
);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.get("/", (_req: Request, res: Response) => {
  res.json({ status: "ok", message: "OmniPress API is running" });
});

export { app };
