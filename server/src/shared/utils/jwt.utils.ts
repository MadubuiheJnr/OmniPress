import { env } from "config/env.js";
import jwt, { type SignOptions } from "jsonwebtoken";
import { UnauthorizedError } from "shared/errors/http.error.js";
import { v4 as uuidv4 } from "uuid";

export interface TokenPayload {
  _id: string;
  sessionId: string;
  email: string;
}

export interface RefreshTokenPayload extends TokenPayload {
  jti: string;
}

export const signAccessToken = (payload: TokenPayload): string => {
  const options: SignOptions = {
    expiresIn: env.ACCESS_TOKEN_EXPIRY,
    algorithm: "HS256",
    issuer: "omnipress",
    subject: payload._id,
  };

  return jwt.sign(payload, env.ACCESS_TOKEN_SECRET, options);
};

export const signRefreshToken = (payload: TokenPayload): string => {
  const options: SignOptions = {
    expiresIn: env.REFRESH_TOKEN_EXPIRY,
    algorithm: "HS256",
    jwtid: uuidv4(),
    issuer: "omnipress",
    subject: payload._id,
  };

  return jwt.sign(payload, env.REFRESH_TOKEN_SECRET, options);
};

//  Verify

export const verifyAccessToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, env.ACCESS_TOKEN_SECRET) as TokenPayload;
  } catch {
    throw new UnauthorizedError("Invalid or expired access token");
  }
};

export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
  try {
    return jwt.verify(token, env.REFRESH_TOKEN_SECRET) as RefreshTokenPayload;
  } catch {
    throw new UnauthorizedError("Invalid or expired refresh token");
  }
};
