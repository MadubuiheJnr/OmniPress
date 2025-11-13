import express from "express";
import {
  getLoggedInUser,
  loginUser,
  registerUser,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/me", verifyToken, getLoggedInUser);

export default authRouter;
