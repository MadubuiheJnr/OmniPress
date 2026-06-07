import type mongoose from "mongoose";
import AuthModel from "../model/auth.model.js";
import type { IAuth, ILoginSession } from "../types/auth.types.js";
import type { ClientSession } from "mongoose";

export class AuthRepository {
  async findByEmail(email: string) {
    return AuthModel.findOne({ email });
  }

  async findById(id: mongoose.Types.ObjectId) {
    return AuthModel.findById(id);
  }

  async create(
    authData: Omit<IAuth, "_id" | "createdAt" | "updatedAt">,
    options?: { session?: ClientSession },
  ) {
    const auth = new AuthModel(authData);
    return auth.save({ session: options?.session as ClientSession });
  }

  async updateById(
    id: mongoose.Types.ObjectId,
    updateData: Partial<Omit<IAuth, "_id" | "createdAt" | "updatedAt">>,
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
  async clearVerifyToken(id: mongoose.Types.ObjectId) {
    return AuthModel.findByIdAndUpdate(
      id,
      {
        $unset: { emailVerifyToken: "", emailVerifyTokenExpiry: "" },
        $set: { isEmailVerified: true },
      },
      { new: true },
    );
  }

  async clearResetToken(id: mongoose.Types.ObjectId) {
    return AuthModel.findByIdAndUpdate(
      id,
      { $unset: { passwordResetToken: "", passwordResetTokenExpiry: "" } },
      { new: true },
    );
  }

  async addSession(id: mongoose.Types.ObjectId, session: ILoginSession) {
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

  async findSessionBySessionId(sessionId: string) {
    return AuthModel.findOne(
      { "loginSessions.sessionId": sessionId },
      { "loginSessions.$": 1, email: 1 },
    );
  }

  async getSessions(id: mongoose.Types.ObjectId) {
    const auth = await AuthModel.findById(id).select("loginSessions");
    return auth?.loginSessions ?? [];
  }

  async updateSessionToken(
    id: mongoose.Types.ObjectId,
    sessionId: string,
    tokenHash: string,
    expiresAt: Date,
    lastActiveAt: Date,
  ) {
    return AuthModel.findOneAndUpdate(
      { _id: id, "loginSessions.sessionId": sessionId },
      {
        $set: {
          "loginSessions.$.tokenHash": tokenHash,
          "loginSessions.$.expiresAt": expiresAt,
          "loginSessions.$.lastActiveAt": lastActiveAt,
        },
      },
      { new: true },
    );
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

  async deleteById(id: mongoose.Types.ObjectId) {
    return AuthModel.findByIdAndDelete(id);
  }
}
