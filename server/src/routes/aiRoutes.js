import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyRole } from "../middleware/verifyRole.js";
import {
  generateContent,
  generateReadTime,
  generateBlogSummary,
  generateSearchSummary,
  generateSentiment,
  generateTags,
  generateTitle,
  optimizeContent,
} from "../controllers/AIcontroller.js";

const aiRouter = express.Router();

aiRouter.post("/title", verifyToken, verifyRole("admin"), generateTitle);
aiRouter.post("/content", verifyToken, verifyRole("admin"), generateContent);
aiRouter.post("/optimize", verifyToken, verifyRole("admin"), optimizeContent);
aiRouter.post("/tags", verifyToken, verifyRole("admin"), generateTags);
aiRouter.post("/readtime", verifyToken, verifyRole("admin"), generateReadTime);
aiRouter.post(
  "/sentiment",
  verifyToken,
  verifyRole("admin"),
  generateSentiment
);
aiRouter.post("/search/summary", generateSearchSummary);
aiRouter.post("/blog/summary", generateBlogSummary);

export default aiRouter;
