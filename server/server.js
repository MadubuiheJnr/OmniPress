import express from "express";
import "dotenv/config.js";
import cors from "cors";
import connectedDB from "./src/configs/DB.js";
import authRouter from "./src/routes/authRoutes.js";
import userRouter from "./src/routes/usersRoutes.js";
import categoryRouter from "./src/routes/categoryRoutes.js";
import blogRouter from "./src/routes/blogRoutes.js";
import aiRouter from "./src/routes/aiRoutes.js";
import commentRouter from "./src/routes/commentRoutes.js";

const server = express();

await connectedDB();

// Middleware
server.use(cors());
server.use(express.json());

const PORT = 8000;

server.get("/", (req, res) => res.send("Server is up and running"));
server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);
server.use("/api/categories", categoryRouter);
server.use("/api/blogs", blogRouter);
server.use("/api/comments", commentRouter);
server.use("/api/ai/generate", aiRouter);

server.listen(PORT, () =>
  console.log(`server is running on http://localhost:${PORT}`)
);

export default server;
