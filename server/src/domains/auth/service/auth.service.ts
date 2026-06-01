import { hashPassword, comparePassword } from "shared/utils/hash.util.js";
import crypto, { createHash } from "node:crypto";
import { v7 as uuidv7 } from "uuid";
import type { ClientSession, Types } from "mongoose";
import {
  BadRequestError,
  UnprocessableEntityError,
} from "shared/errors/http.error.js";
import type { IAuth, ILoginSession } from "../types/auth.types.js";
import { signAccessToken, signRefreshToken } from "shared/utils/jwt.utils.js";
import type { AuthRepository as IAuthRepository } from "../repository/auth.repository.js";
import type { VerifyEmailDto } from "../dto/verify-email.dto.js";

export class AuthService {
  constructor(private readonly authRepository: IAuthRepository) {}
  async createAuth(
    authData: Pick<IAuth, "email" | "password">,
    options?: { session?: ClientSession },
  ): Promise<Pick<IAuth, "_id" | "email" | "emailVerifyToken">> {
    const { email, password } = authData;
    const hashedPassword = await hashPassword(password);
    const verifyToken = crypto.randomBytes(32).toString("hex");
    const hashedEmailVerifyToken = crypto
      .createHash("sha256")
      .update(verifyToken)
      .digest("hex");
    const verificationTokenExpiresAt = new Date(
      Date.now() + 24 * 60 * 60 * 1000,
    );

    const newAuth = await this.authRepository.create(
      {
        email,
        password: hashedPassword,
        isEmailVerified: false,
        emailVerifyToken: hashedEmailVerifyToken,
        emailVerifyTokenExpiry: verificationTokenExpiresAt,
        loginSessions: [],
      },
      { session: options?.session as ClientSession },
    );

    return {
      _id: newAuth._id,
      email: newAuth.email,
      emailVerifyToken: verifyToken,
    };
  }

  async getUserIdByEmail(email: string): Promise<Types.ObjectId | null> {
    const auth = await this.authRepository.findByEmail(email);
    return auth ? auth._id : null;
  }

  async login(
    id: Types.ObjectId,
    password: string,
    sessionInfo?: Omit<
      ILoginSession,
      | "sessionId"
      | "isCurrent"
      | "lastActiveAt"
      | "createdAt"
      | "location"
      | "tokenHash"
    >,
  ) {
    const auth = await this.authRepository.findById(id);

    if (!auth) {
      throw new BadRequestError(
        "Invalid credentials",
        "Please check your credentials and try again",
      );
    }
    const passwordMatch = await comparePassword(password, auth.password);
    if (!passwordMatch) {
      throw new BadRequestError(
        "Invalid credentials",
        "Please check your credentials and try again",
      );
    }

    const emailVerified = auth.isEmailVerified;
    if (!emailVerified) {
      throw new BadRequestError(
        "Email is not verified",
        "Please verify your email address and login again",
      );
    }

    const sessionId = uuidv7();

    const accessToken = signAccessToken({
      _id: auth._id.toString(),
      sessionId,
      email: auth.email,
    });

    const refreshToken = signRefreshToken({
      _id: auth._id.toString(),
      sessionId,
      email: auth.email,
    });

    const tokenHash = createHash("sha256").update(refreshToken).digest("hex");

    await this.authRepository.addSession(auth._id, {
      sessionId,
      tokenHash,
      ip: sessionInfo?.ip ?? "unknown",
      location: "unknown",
      device: sessionInfo?.device ?? "unknown",
      browser: sessionInfo?.browser ?? "unknown",
      userAgent: sessionInfo?.userAgent ?? "unknown",
      isCurrent: true,
      lastActiveAt: new Date(),
      createdAt: new Date(),
    });

    return {
      _id: auth._id,
      email: auth.email,
      createdAt: auth.createdAt,
      accessToken,
      refreshToken,
    };
  }

  async verifyEmail(query: VerifyEmailDto): Promise<boolean> {
    const hashedToken = crypto
      .createHash("sha256")
      .update(query.token)
      .digest("hex");
    const auth = await this.authRepository.findByVerifyToken(hashedToken);

    if (!auth) {
      throw new UnprocessableEntityError(
        "Unable to verify email",
        "Please try again later or request a new verification email",
      );
    }

    await this.authRepository.clearVerifyToken(auth._id);

    return true;
  }

  // async forgotPassword(email: string) {
  //   const auth = await authRepository.findByEmail(email);

  //   if (!auth) {
  //     throw new Error(
  //       "If an account with that email exists, a password reset link will be sent",
  //     );
  //   }

  //   const resetToken = crypto.randomBytes(32).toString("hex");
  //   const resetTokenExpiresAt: Date = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  //   await authRepository.updateById(auth._id, {
  //     passwordResetToken: resetToken,
  //     passwordResetTokenExpiry: resetTokenExpiresAt,
  //   });

  //   return true;
  // }

  // async resetPassword(token: string, newPassword: string) {
  //   const auth = await authRepository.findByResetToken(token);

  //   if (
  //     !auth ||
  //     !auth.passwordResetToken ||
  //     !auth.passwordResetTokenExpiry ||
  //     auth.passwordResetTokenExpiry < new Date()
  //   ) {
  //     throw new Error(
  //       "Something went wrong, please try again or request a new password reset link",
  //     );
  //   }

  //   const hashedPassword = await hashPassword(newPassword);

  //   await authRepository.updateById(auth._id, {
  //     password: hashedPassword,
  //     passwordResetToken: "",
  //     passwordResetTokenExpiry: new Date(0),
  //   });

  //   return true;
  // }

  // async changePassword(
  //   userId: mongoose.Types.ObjectId,
  //   currentPassword: string,
  //   newPassword: string,
  // ) {
  //   const auth = await authRepository.findById(userId);
  //   if (!auth) {
  //     throw new Error("User not found");
  //   }

  //   const passwordMatch = await comparePassword(currentPassword, auth.password);
  //   if (!passwordMatch) {
  //     throw new Error("Current password is incorrect");
  //   }

  //   const hashedPassword = await hashPassword(newPassword);
  //   await authRepository.updateById(auth._id, {
  //     password: hashedPassword,
  //   });

  //   return true;
  // }

  // async logout(userId: mongoose.Types.ObjectId, sessionId: string) {
  //   await authRepository.removeSession(userId, sessionId);
  //   return true;
  // }

  // async getSessions(userId: mongoose.Types.ObjectId) {
  //   return authRepository.getSessions(userId);
  // }

  // async revokeSession(userId: mongoose.Types.ObjectId, sessionId: string) {
  //   await authRepository.removeSession(userId, sessionId);
  //   return true;
  // }
}
