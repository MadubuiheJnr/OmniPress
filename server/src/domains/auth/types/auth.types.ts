import type { Document } from "mongoose";
import type mongoose from "mongoose";

export interface ILoginSession {
  sessionId: string;
  tokenHash: string;
  expiresAt: Date;
  ip: string;
  location: string;
  device: string;
  browser: string;
  userAgent: string;
  lastActiveAt: Date;
  createdAt: Date;
}

export interface IAuth {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  isEmailVerified: boolean;
  emailVerifyToken?: string;
  emailVerifyTokenExpiry?: Date;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetTokenExpiry?: Date;
  loginSessions: ILoginSession[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuthUser {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatar: string;
}

export interface IAuthResponse {
  user: IAuthUser;
  accessToken: string;
  refreshToken: string;
}

export interface IAccessTokenPayload {
  authId: string;
  sessionId: string;
  email: string;
}

export interface IAuthDocument extends Omit<IAuth, "_id">, Document {}

// export interface IAuthService {
//   createAuth(
//     authData: Pick<IAuth, "email" | "password">,
//     options?: { session?: mongoose.ClientSession },
//   ): Promise<Pick<IAuth, "_id" | "email" | "emailVerifyToken">>;
//   getUserIdByEmail(email: string): Promise<mongoose.Types.ObjectId | null>;
//   login(
//     id: mongoose.Types.ObjectId,
//     password: string,
//     loginSession?: Omit<
//       ILoginSession,
//       | "sessionId"
//       | "isCurrent"
//       | "lastActiveAt"
//       | "createdAt"
//       | "location"
//       | "tokenHash"
//     >,
//   ): Promise<{
//     _id: mongoose.Types.ObjectId;
//     email: string;
//     createdAt: Date;
//     accessToken: string;
//     refreshToken: string;
//   }>;
//   verifyEmail(query: VerifyEmailDto): Promise<void>;
// }
