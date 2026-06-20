import { hashPassword, comparePassword } from "shared/utils/hash.util.js";
import crypto from "node:crypto";
import { v7 as uuidv7 } from "uuid";
import type { ClientSession, Types } from "mongoose";
import {
  BadRequestError,
  UnauthorizedError,
} from "shared/errors/http.error.js";
import type { IAuth, ILoginSession } from "../types/auth.types.js";
import type { AuthRepository as IAuthRepository } from "../repository/auth.repository.js";
import type { VerifyEmailDto } from "../dto/verify-email.dto.js";
import type { TokenService as ITokenService } from "./token.service.js";

export class AuthService {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly tokenService: ITokenService,
  ) {}
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
      | "expiresAt"
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

    const { accessToken, refreshToken, hashedRefreshToken } =
      await this.tokenService.issueTokens({
        authId: auth._id.toString(),
        sessionId,
        email: auth.email,
      });

    await this.authRepository.addSession(auth._id, {
      sessionId,
      tokenHash: hashedRefreshToken,
      ip: sessionInfo?.ip ?? "unknown",
      location: "unknown",
      device: sessionInfo?.device ?? "unknown",
      browser: sessionInfo?.browser ?? "unknown",
      userAgent: sessionInfo?.userAgent ?? "unknown",
      lastActiveAt: new Date(),
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
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
      throw new BadRequestError(
        "Unable to verify email",
        "This link may be invalid or has expired. Please request a new one or try again.",
      );
    }

    await this.authRepository.clearVerifyToken(auth._id);

    return true;
  }

  async refresh(incomingToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const dotIndex = incomingToken.indexOf(".");
    const sessionId = incomingToken.substring(0, dotIndex);
    const token = incomingToken.substring(dotIndex + 1);
    const hashedToken = crypto
      .createHash("sha256")
      .update(incomingToken)
      .digest("hex");

    if (!sessionId || !token) {
      throw new UnauthorizedError(
        "You're not logged in",
        "Your request cannot be processed. Please login again to continue.",
      );
    }

    const session = await this.authRepository.findSessionBySessionId(sessionId);

    if (!session) {
      throw new UnauthorizedError(
        "Session expired",
        "Your request cannot be processed. Please login again to continue.",
      );
    }

    const sessionData = session.loginSessions[0];

    if (sessionData) {
      if (new Date() > sessionData?.expiresAt) {
        await this.authRepository.removeSession(session._id, sessionId);
        throw new UnauthorizedError(
          "Session expired",
          "Your request cannot be processed. Please login again to continue.",
        );
      }
    }

    if (sessionData?.tokenHash !== hashedToken) {
      await this.authRepository.removeSession(session._id, sessionId);
      throw new UnauthorizedError(
        "Your session has been terminated for security reasons",
        "Login again to continue. If this happens repeatedly, please contact support",
      );
    }

    const { accessToken, refreshToken, hashedRefreshToken } =
      await this.tokenService.issueTokens({
        authId: session._id.toString(),
        sessionId,
        email: session.email,
      });
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const lastActiveAt = new Date();

    await this.authRepository.updateSessionToken(
      session._id,
      sessionId,
      hashedRefreshToken,
      expiresAt,
      lastActiveAt,
    );

    return { accessToken, refreshToken };
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
