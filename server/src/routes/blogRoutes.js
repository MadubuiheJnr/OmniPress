import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyRole } from "../middleware/verifyRole.js";
import {
  createBlog,
  deleteBlogById,
  getAllBlogsAdmin,
  getAllPublishedBlogs,
  getBlogById,
  toggleIsFeatured,
  toggleIsPublished,
  updateBlogById,
} from "../controllers/blogController.js";
import upload from "../middleware/multer.js";

const blogRouter = express.Router();

blogRouter.post(
  "/create",
  upload.single("image"),
  verifyToken,
  verifyRole("admin"),
  createBlog
);
blogRouter.get("/admin", verifyToken, verifyRole("admin"), getAllBlogsAdmin);
blogRouter.get("/", getAllPublishedBlogs);
blogRouter.get("/:id", getBlogById);
blogRouter.put("/update/:id", verifyToken, verifyRole("admin"), updateBlogById);
blogRouter.put(
  "/toggle/published/:id",
  verifyToken,
  verifyRole("admin"),
  toggleIsPublished
);
blogRouter.put(
  "/toggle/featured/:id",
  verifyToken,
  verifyRole("admin"),
  toggleIsFeatured
);
blogRouter.delete(
  "/delete/:id",
  verifyToken,
  verifyRole("admin"),
  deleteBlogById
);

export default blogRouter;
