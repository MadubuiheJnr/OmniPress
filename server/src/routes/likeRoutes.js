import express from "express";
import {
  checkUserReaction,
  toggleLike,
} from "../controllers/likeController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const likeRouter = express.Router();

likeRouter.use(verifyToken);

likeRouter.post("/", toggleLike);
likeRouter.get("/reaction/:targetId", checkUserReaction);

export default likeRouter;
