import type { ClientSession, Types } from "mongoose";
import type { IAuth, ILoginSession } from "../types/auth.types.js";
import type { AuthRepository as IAuthRepository } from "../repository/auth.repository.js";
import type { VerifyEmailDto } from "../dto/verify-email.dto.js";
import type { TokenService as ITokenService } from "./token.service.js";
export declare class AuthService {
    private readonly authRepository;
    private readonly tokenService;
    constructor(authRepository: IAuthRepository, tokenService: ITokenService);
    createAuth(authData: Pick<IAuth, "email" | "password">, options?: {
        session?: ClientSession;
    }): Promise<Pick<IAuth, "_id" | "email" | "emailVerifyToken">>;
    getUserIdByEmail(email: string): Promise<Types.ObjectId | null>;
    login(id: Types.ObjectId, password: string, sessionInfo?: Omit<ILoginSession, "sessionId" | "expiresAt" | "lastActiveAt" | "createdAt" | "location" | "tokenHash">): Promise<{
        _id: Types.ObjectId;
        email: string;
        createdAt: Date;
        accessToken: string;
        refreshToken: string;
    }>;
    verifyEmail(query: VerifyEmailDto): Promise<boolean>;
    refresh(incomingToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        authId: Types.ObjectId;
        email: string;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map