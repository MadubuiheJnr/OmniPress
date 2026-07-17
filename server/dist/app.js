import express, {} from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import { bootstrapContainer } from "./app.container.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
const app = express();
const { authRouter, uploadRouter, swaggerDocsRouter, articleRouter, articleCategoryRouter, } = bootstrapContainer();
app.use(helmet());
app.use(cookieParser());
app.disable("x-powered-by");
app.use(cors({
    origin: env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to OmniPress Docs!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
app.get("/", (_req, res) => {
    res.json({ status: "ok", message: "OmniPress API is running" });
});
app.use("/v1/auth", authRouter);
app.use("/v1/upload", uploadRouter);
app.use("/v1/article", articleRouter);
app.use("/v1/article/category", articleCategoryRouter);
app.use("/v1/docs", swaggerDocsRouter);
app.use(errorMiddleware);
export { app };
//# sourceMappingURL=app.js.map