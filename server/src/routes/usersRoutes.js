import express from "express";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyRole } from "../middleware/verifyRole.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();
userRouter.use(verifyToken);

userRouter.get("/", verifyRole("admin"), getAllUsers);

userRouter.get("/:id", verifyRole("admin", "user"), getUserById);

userRouter.put(
  "/update/:id",
  upload.single("image"),
  verifyRole("admin", "user"),
  updateUserById
);

userRouter.delete("/delete/:id", verifyRole("admin"), deleteUserById);

export default userRouter;
