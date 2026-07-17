import type jwt from "jsonwebtoken";
import type { IAccessTokenPayload } from "../types/auth.types.js";
export declare class TokenService {
    private readonly tokenProvider;
    constructor(tokenProvider: typeof jwt);
    private createRefreshToken;
    private hashRefreshToken;
    private signAccessToken;
    verifyAccessToken(token: string): IAccessTokenPayload;
    issueTokens({ authId, sessionId, email, }: IAccessTokenPayload): Promise<{
        accessToken: string;
        refreshToken: string;
        hashedRefreshToken: string;
    }>;
}
//# sourceMappingURL=token.service.d.ts.map