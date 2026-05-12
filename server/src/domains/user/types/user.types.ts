import type { Types, Document } from "mongoose";

export interface User {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  profilePicture: string;
  bio: string;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  articles: Types.ObjectId[];
  isPrivate: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDocument extends Omit<User, "_id">, Document {}
