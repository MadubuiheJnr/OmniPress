import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blogs",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    content: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "likes" }],
    likesCount: { type: Number, default: 0 },
    dislikesCount: { type: Number, default: 0 },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const commentModel = mongoose.model("comments", commentSchema);

export default commentModel;
