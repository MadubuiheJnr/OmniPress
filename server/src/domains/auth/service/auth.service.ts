import { comparePassword, hashPassword } from "shared/utils/hash.util.js";
import type { RegisterDto } from "../dto/register.dto.js";
import authRepository from "../repository/auth.repository.js";
import crypto from "node:crypto";
import type { LoginDto } from "../dto/login.dto.js";
import { v7 as uuidv7 } from "uuid";
import type mongoose from "mongoose";
import { ConflictError } from "shared/errors/http.error.js";

export class AuthService {
  async register(data: RegisterDto) {
    const { firstName, lastName, username, email, password } = data;

    const emailExists = await authRepository.findByEmail(email);
    if (emailExists) {
      return new ConflictError("Email already in use");
    }

    const usernameExists = await userRepository.findByUsername(username);
    if (usernameExists) {
      return new ConflictError("Username already in use");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await userRepository.create({
      firstName,
      lastName,
      username,
    });

    const verificationToken = await new Promise<string>((resolve, reject) => {
      crypto.randomBytes(32, (err, buf) => {
        if (err) {
          reject(new Error("Failed to generate verification token"));
          return;
        }
        resolve(buf.toString("hex"));
      });
    });

    const verificationTokenExpiresAt: Date = new Date(
      Date.now() + 24 * 60 * 60 * 1000,
    ); // 24 hours

    await authRepository.create({
      userId: newUser._id,
      email,
      emailVerifyToken: verificationToken,
      emailVerifyTokenExpiry: verificationTokenExpiresAt,
      password: hashedPassword,
      isEmailVerified: false,
      loginSessions: [],
    });
  }

  async login(data: LoginDto) {
    const { email, password, loginSession } = data;

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const auth = await authRepository.findByEmail(email);

    if (!auth) {
      throw new Error("Invalid email or password");
    }

    const passwordMatch = await comparePassword(password, auth.password);
    if (!passwordMatch) {
      throw new Error("Invalid email or password");
    }

    const emailVerified = auth.isEmailVerified;
    if (!emailVerified) {
      throw new Error("Email not verified");
    }

    const emailVerifyTokenExists = auth.emailVerifyToken;
    if (emailVerifyTokenExists) {
      throw new Error("Email verification pending");
    }

    authRepository.addSession(auth._id, {
      sessionId: uuidv7(),
      ip: loginSession?.ip || "",
      location: loginSession?.location || "",
      device: loginSession?.device || "",
      browser: loginSession?.browser || "",
      userAgent: loginSession?.userAgent || "",
      isCurrent: true,
      lastActiveAt: new Date(),
      createdAt: new Date(),
    });

    return {
      user: {
        _id: auth.userId,
        firstName: auth.userId.firstName,
        lastName: auth.userId.lastName,
        username: auth.userId.username,
        email: auth.email,
        avatar: auth.userId.avatar,
      },
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
