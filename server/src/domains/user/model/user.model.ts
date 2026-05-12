import mongoose from "mongoose";
import type { UserDocument } from "../types/user.types.js";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    profilePicture: { type: String, default: "" },
    bio: { type: String, default: "" },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
    isPrivate: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const UserModel = mongoose.model<UserDocument>("User", UserSchema);

export default UserModel;
