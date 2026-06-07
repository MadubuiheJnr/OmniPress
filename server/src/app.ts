import express, { type Request, type Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import { bootstrapContainer } from "./app.container.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express();
const { authRouter } = bootstrapContainer();

app.use(helmet());
app.use(cookieParser());
app.disable("x-powered-by");

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

app.use("/api/auth", authRouter);
app.use(errorMiddleware);

export { app };
