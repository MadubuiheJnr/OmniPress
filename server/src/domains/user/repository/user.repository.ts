import type { Types } from "mongoose";
import UserModel from "../model/user.model.js";
import type { User } from "../types/user.types.js";

class UserRepository {
  async findById(id: Types.ObjectId) {
    return UserModel.findById(id);
  }

  async findByIdSelect(id: Types.ObjectId, fields: string) {
    return UserModel.findById(id).select(fields);
  }

  async findByUsername(username: string) {
    return UserModel.findOne({ username });
  }

  async create(userData: Omit<User, "_id" | "createdAt" | "updatedAt">) {
    const user = new UserModel(userData);
    return user.save();
  }

  async updateById(
    id: Types.ObjectId,
    updateData: Partial<Omit<User, "_id" | "createdAt" | "updatedAt">>,
  ) {
    return UserModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteById(id: Types.ObjectId) {
    return UserModel.findByIdAndDelete(id);
  }

  async addFollower(userId: Types.ObjectId, followerId: Types.ObjectId) {
    return UserModel.findByIdAndUpdate(
      userId,
      { $addToSet: { followers: followerId } },
      { new: true },
    );
  }

  async removeFollower(userId: Types.ObjectId, followerId: Types.ObjectId) {
    return UserModel.findByIdAndUpdate(
      userId,
      { $pull: { followers: followerId } },
      { new: true },
    );
  }

  async addArticle(userId: Types.ObjectId, articleId: Types.ObjectId) {
    return UserModel.findByIdAndUpdate(
      userId,
      { $addToSet: { articles: articleId } },
      { new: true },
    );
  }
}

export default new UserRepository();
