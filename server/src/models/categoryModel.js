import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: [2, "Characters must be at least two"],
      maxlength: [50, "Characters must not exceed 50"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [2, "Characters must be at least two"],
      maxlength: [50, "Characters must not exceed 50"],
    },
    isFeatured: { type: Boolean, default: false },
    postCount: { type: Number, default: 0 },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("categories", categorySchema);

export default categoryModel;
