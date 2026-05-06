import type mongoose from "mongoose";
import AuthModel from "../model/auth.model.js";
import type { Auth, LoginSession } from "../types/auth.types.js";

class AuthRepository {
  async findByEmail(email: string) {
    return AuthModel.findOne({ email });
  }

  async findById(id: mongoose.Types.ObjectId) {
    return AuthModel.findById(id);
  }

  async create(authData: Omit<Auth, "_id" | "createdAt" | "updatedAt">) {
    const auth = new AuthModel(authData);
    return auth.save();
  }

  async updateById(
    id: mongoose.Types.ObjectId,
    updateData: Partial<Omit<Auth, "_id" | "createdAt" | "updatedAt">>,
  ) {
    return AuthModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async findByVerifyToken(token: string) {
    return AuthModel.findOne({
      emailVerifyToken: token,
      emailVerifyTokenExpiry: { $gt: new Date() },
    });
  }

  async findByResetToken(token: string) {
    return AuthModel.findOne({
      passwordResetToken: token,
      passwordResetTokenExpiry: { $gt: new Date() },
    });
  }

  async addSession(id: mongoose.Types.ObjectId, session: LoginSession) {
    return AuthModel.findByIdAndUpdate(
      id,
      {
        $push: {
          loginSessions: {
            $each: [session],
            $slice: -5, // keep only the 5 most recent sessions
            $position: 0, // add to the front of the array
          },
        },
      },
      { new: true },
    );
  }

  async getSessions(id: mongoose.Types.ObjectId) {
    const auth = await AuthModel.findById(id).select("loginSessions");
    return auth?.loginSessions ?? [];
  }

  async removeSession(id: mongoose.Types.ObjectId, sessionId: string) {
    return AuthModel.findByIdAndUpdate(
      id,
      { $pull: { loginSessions: { sessionId } } },
      { new: true },
    );
  }

  async removeAllSessions(id: mongoose.Types.ObjectId) {
    return AuthModel.findByIdAndUpdate(
      id,
      { $set: { loginSessions: [] } },
      { new: true },
    );
  }
}

export default new AuthRepository();
