import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addComment,
  deleteComment,
  getAllComment,
  getBlogComments,
  getCommentById,
  toggleIsApproved,
} from "../controllers/commentController.js";
import { verifyRole } from "../middleware/verifyRole.js";

const commentRouter = express.Router();

commentRouter.post("/add", verifyToken, addComment);
commentRouter.get("/", verifyToken, verifyRole("admin"), getAllComment);
commentRouter.get("/blog/:blogId", getBlogComments);
commentRouter.get("/:id", getCommentById);
commentRouter.delete(
  "/:id/delete",
  verifyToken,
  verifyRole("admin", "user"),
  deleteComment
);
commentRouter.put(
  "/toggle/approved",
  verifyToken,
  verifyRole("admin"),
  toggleIsApproved
);

export default commentRouter;
