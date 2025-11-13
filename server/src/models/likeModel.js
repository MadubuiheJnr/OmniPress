import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
    targetType: { type: String, enum: ["blog", "comment"], required: true },
    type: { type: String, enum: ["like", "dislike"], required: true },
  },
  { timestamps: true }
);

const likeModel = mongoose.model("likes", likeSchema);

export default likeModel;
