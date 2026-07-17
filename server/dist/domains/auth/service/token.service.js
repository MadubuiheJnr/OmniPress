import { env } from "config/env.js";
import crypto from "node:crypto";
import { UnauthorizedError } from "shared/errors/http.error.js";
export class TokenService {
    tokenProvider;
    constructor(tokenProvider) {
        this.tokenProvider = tokenProvider;
    }
    createRefreshToken() {
        return crypto.randomBytes(64).toString("hex");
    }
    hashRefreshToken(token) {
        return crypto.createHash("sha256").update(token).digest("hex");
    }
    signAccessToken(payload) {
        const options = {
            expiresIn: env.ACCESS_TOKEN_EXPIRY,
            algorithm: "HS256",
            issuer: "omnipress",
            subject: payload.authId,
        };
        return this.tokenProvider.sign(payload, env.ACCESS_TOKEN_SECRET, options);
    }
    verifyAccessToken(token) {
        try {
            return this.tokenProvider.verify(token, env.ACCESS_TOKEN_SECRET);
        }
        catch {
            throw new UnauthorizedError("Invalid or expired access token");
        }
    }
    async issueTokens({ authId, sessionId, email, }) {
        const accessToken = this.signAccessToken({ authId, sessionId, email });
        const randomRefreshToken = this.createRefreshToken();
        const refreshToken = `${sessionId}.${randomRefreshToken}`;
        const hashedRefreshToken = this.hashRefreshToken(refreshToken);
        return { accessToken, refreshToken, hashedRefreshToken };
    }
}
//# sourceMappingURL=token.service.js.map