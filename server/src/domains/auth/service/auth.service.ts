import { comparePassword, hashPassword } from "shared/utils/hash.util.js";
import authRepository from "../repository/auth.repository.js";
import crypto from "node:crypto";
import { v7 as uuidv7 } from "uuid";
import mongoose from "mongoose";
import type { ClientSession, Types } from "mongoose";
import { BadRequestError } from "shared/errors/http.error.js";
import type { IAuth, ILoginSession } from "../types/auth.types.js";

export class AuthService {
  async createAuth(
    authData: Pick<IAuth, "email" | "password">,
    options?: { session?: ClientSession },
  ): Promise<Pick<IAuth, "_id" | "email" | "emailVerifyToken">> {
    const { email, password } = authData;
    const hashedPassword = await hashPassword(password);
    const emailVerifyToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpiresAt = new Date(
      Date.now() + 24 * 60 * 60 * 1000,
    );

    const newAuth = await authRepository.create(
      {
        email,
        password: hashedPassword,
        isEmailVerified: false,
        emailVerifyToken,
        emailVerifyTokenExpiry: verificationTokenExpiresAt,
        loginSessions: [],
      },
      { session: options?.session as ClientSession },
    );

    return {
      _id: newAuth._id,
      email: newAuth.email,
      emailVerifyToken,
    };
  }

  async getUserIdByEmail(email: string): Promise<Types.ObjectId | null> {
    const auth = await authRepository.findByEmail(email);
    return auth ? auth._id : null;
  }

  async login(
    id: Types.ObjectId,
    password: string,
    loginSession?: Omit<
      ILoginSession,
      "sessionId" | "isCurrent" | "lastActiveAt" | "createdAt"
    >,
  ) {
    const auth = await authRepository.findById(id);

    if (!auth) {
      throw new BadRequestError("Invalid credentials");
    }
    const passwordMatch = await comparePassword(password, auth.password);
    if (!passwordMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    const emailVerified = auth.isEmailVerified;
    if (!emailVerified) {
      throw new BadRequestError("Email not verified");
    }

    // const loginAt = new Date();

    await authRepository.addSession(auth._id, {
      sessionId: uuidv7(),
      ip: loginSession?.ip ?? "unknown",
      location: loginSession?.location ?? "unknown",
      device: loginSession?.device ?? "unknown",
      browser: loginSession?.browser ?? "unknown",
      userAgent: loginSession?.userAgent ?? "unknown",
      isCurrent: true,
      lastActiveAt: new Date(),
      createdAt: new Date(),
    });

    return {
      _id: auth._id,
      email: auth.email,
      createdAt: auth.createdAt,
    };
  }

  async verifyEmail(token: string) {
    const auth = await authRepository.findByVerifyToken(token);

    if (
      !auth ||
      !auth?.emailVerifyToken ||
      !auth.emailVerifyTokenExpiry ||
      auth.emailVerifyTokenExpiry < new Date()
    ) {
      throw new Error(
        "Something went wrong, please try again or request a new verification email",
      );
    }

    await authRepository.updateById(auth._id, {
      isEmailVerified: true,
      emailVerifyToken: "",
      emailVerifyTokenExpiry: new Date(0),
    });

    return true;
  }

  async forgotPassword(email: string) {
    const auth = await authRepository.findByEmail(email);

    if (!auth) {
      throw new Error(
        "If an account with that email exists, a password reset link will be sent",
      );
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiresAt: Date = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await authRepository.updateById(auth._id, {
      passwordResetToken: resetToken,
      passwordResetTokenExpiry: resetTokenExpiresAt,
    });

    return true;
  }

  async resetPassword(token: string, newPassword: string) {
    const auth = await authRepository.findByResetToken(token);

    if (
      !auth ||
      !auth.passwordResetToken ||
      !auth.passwordResetTokenExpiry ||
      auth.passwordResetTokenExpiry < new Date()
    ) {
      throw new Error(
        "Something went wrong, please try again or request a new password reset link",
      );
    }

    const hashedPassword = await hashPassword(newPassword);

    await authRepository.updateById(auth._id, {
      password: hashedPassword,
      passwordResetToken: "",
      passwordResetTokenExpiry: new Date(0),
    });

    return true;
  }

  async changePassword(
    userId: mongoose.Types.ObjectId,
    currentPassword: string,
    newPassword: string,
  ) {
    const auth = await authRepository.findById(userId);
    if (!auth) {
      throw new Error("User not found");
    }

    const passwordMatch = await comparePassword(currentPassword, auth.password);
    if (!passwordMatch) {
      throw new Error("Current password is incorrect");
    }

    const hashedPassword = await hashPassword(newPassword);
    await authRepository.updateById(auth._id, {
      password: hashedPassword,
    });

    return true;
  }

  async logout(userId: mongoose.Types.ObjectId, sessionId: string) {
    await authRepository.removeSession(userId, sessionId);
    return true;
  }

  async getSessions(userId: mongoose.Types.ObjectId) {
    return authRepository.getSessions(userId);
  }

  async revokeSession(userId: mongoose.Types.ObjectId, sessionId: string) {
    await authRepository.removeSession(userId, sessionId);
    return true;
  }
}
