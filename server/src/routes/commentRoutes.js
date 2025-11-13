import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addComment,
  deleteComment,
  getAllComment,
  toggleIsApproved,
} from "../controllers/commentController.js";
import { verifyRole } from "../middleware/verifyRole.js";

const commentRouter = express.Router();

commentRouter.use(verifyToken);

commentRouter.post("/add", addComment);
commentRouter.get("/", getAllComment);
commentRouter.delete("/:id/delete", deleteComment);
commentRouter.put("/toggle/approved", verifyRole("admin"), toggleIsApproved);

export default commentRouter;
