import express from "express";
import { toggleLike } from "../controllers/likeController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const likeRouter = express.Router();

likeRouter.use(verifyToken);

likeRouter.post("/", toggleLike);

export default likeRouter;
