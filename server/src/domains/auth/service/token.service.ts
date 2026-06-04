import { env } from "config/env.js";
import type { AuthRepository as IAuthRepository } from "../repository/auth.repository.js";
import type jwt from "jsonwebtoken";
import type { IAccessTokenPayload } from "../types/auth.types.js";
import crypto from "node:crypto";
import { UnauthorizedError } from "shared/errors/http.error.js";

export class TokenService {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly tokenProvider: typeof jwt,
  ) {}

  private createRefreshToken() {
    return crypto.randomBytes(64).toString("hex");
  }
  private hashRefreshToken(token: string): string {
    return crypto.createHash("sha256").update(token).digest("hex");
  }
  private signAccessToken(payload: IAccessTokenPayload): string {
    const options: jwt.SignOptions = {
      expiresIn: env.ACCESS_TOKEN_EXPIRY,
      algorithm: "HS256",
      issuer: "omnipress",
      subject: payload.userId,
    };

    return this.tokenProvider.sign(payload, env.ACCESS_TOKEN_SECRET, options);
  }

  verifyAccessToken(token: string): IAccessTokenPayload {
    try {
      return this.tokenProvider.verify(
        token,
        env.ACCESS_TOKEN_SECRET,
      ) as IAccessTokenPayload;
    } catch {
      throw new UnauthorizedError("Invalid or expired access token");
    }
  }

  async issueTokens({
    userId,
    sessionId,
    email,
  }: IAccessTokenPayload): Promise<{
    accessToken: string;
    refreshToken: string;
    hashedRefreshToken: string;
  }> {
    const accessToken = this.signAccessToken({ userId, sessionId, email });
    const refreshToken = this.createRefreshToken();
    const hashedRefreshToken = this.hashRefreshToken(refreshToken);

    return { accessToken, refreshToken, hashedRefreshToken };
  }
}
