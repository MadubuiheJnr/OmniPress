import express, { type Request, type Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import { bootstrapContainer } from "./app.container.js";
import { createAuthRouter } from "./domains/auth/routes/auth.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();
const { authController, registerNotificationSubscribers } =
  bootstrapContainer();
registerNotificationSubscribers();

app.use(helmet());
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

app.use("/api/auth", createAuthRouter(authController));
app.use(errorMiddleware);

export { app };
