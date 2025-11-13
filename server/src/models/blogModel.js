import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: String, required: true }],
    author: {
      name: { type: String, required: true },
      social: {
        x: { type: String },
        ig: { type: String },
        fb: { type: String },
        yt: { type: String },
        medium: { type: String },
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "likes" }],
    views: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    readingTime: { type: String },
    isPublished: { type: Boolean, default: false },
    sentiment: { type: String },
    likesCount: { type: Number, default: 0 },
    dislikesCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const blogModel = mongoose.model("blogs", blogSchema);

export default blogModel;
