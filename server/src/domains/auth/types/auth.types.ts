import type { Document } from "mongoose";
import type mongoose from "mongoose";

export interface LoginSession {
  sessionId: string;
  ip: string;
  location: string;
  device: string;
  browser: string;
  userAgent: string;
  isCurrent: boolean;
  lastActiveAt: Date;
  createdAt: Date;
}

export interface Auth {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  emailVerifyToken?: string;
  emailVerifyTokenExpiry?: Date;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetTokenExpiry?: Date;
  loginSessions: LoginSession[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatar: string;
}

export interface AuthResponse {
  user: AuthUser;
  tokens: AuthTokens;
}

export interface AuthDocument extends Omit<Auth, "_id">, Document {}
