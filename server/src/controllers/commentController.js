import blogModel from "../models/blogModel.js";
import commentModel from "../models/commentModel.js";
import handleError from "../utils/handleError.js";

export const addComment = async (req, res) => {
  const { blog, content } = req.body;
  const user = req.user.id;
  try {
    const blogExist = await blogModel.findById(blog);
    if (!blogExist) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (!content?.trim()) {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }

    const comment = new commentModel({
      blog,
      user,
      content,
    });
    await comment.save();

    return res.status(201).json({ message: "Comment submitted for review" });
  } catch (error) {
    handleError(res, error);
  }
};
export const getAllComment = async (req, res) => {
  try {
    const comments = await commentModel
      .find()
      .sort({ createdAt: -1 })
      .populate({
        path: "blog",
        select: "title category createdAt",
      })
      .populate({
        path: "user",
        select: "name email role",
      });
    res.status(200).json(comments);
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const comment = await commentModel.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // allow admin
    if (req.user.role === "admin") {
      await comment.deleteOne();
      return res.status(200).json({ message: "Comment deleted" });
    }

    // allow owner
    if (comment.user.toString() === userId) {
      await comment.deleteOne();
      return res.status(200).json({ message: "Comment deleted" });
    }

    return res
      .status(403)
      .json({ message: "Not authorized to delete this comment" });
  } catch (error) {
    handleError(res, error);
  }
};

export const toggleIsApproved = async (req, res) => {
  try {
    const { id } = req.body;
    const comment = await commentModel.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    comment.isApproved = !comment.isApproved;
    await comment.save();

    const status = comment.isApproved ? "approved" : "unapproved";
    res.status(200).json({ message: `Comment ${status}` });
  } catch (error) {
    handleError(res, error);
  }
};
