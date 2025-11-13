import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyRole } from "../middleware/verifyRole.js";
import {
  createCategory,
  deleteCategoryById,
  getAllCategory,
  getCategoryById,
  updateCategoryById,
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post(
  "/create",
  verifyToken,
  verifyRole("admin"),
  createCategory
);

categoryRouter.get("/", getAllCategory);
categoryRouter.get("/:id", verifyToken, verifyRole("admin"), getCategoryById);
categoryRouter.put(
  "/update/:id",
  verifyToken,
  verifyRole("admin"),
  updateCategoryById
);
categoryRouter.delete(
  "/delete/:id",
  verifyToken,
  verifyRole("admin"),
  deleteCategoryById
);

export default categoryRouter;
