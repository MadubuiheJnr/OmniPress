import type { LoginDto } from "../dto/login.dto.js";
import type { IAuthResponse, ILoginSession } from "../types/auth.types.js";
import type { IUserService } from "domains/user/types/user.types.js";
import type { AuthService as IAuthService } from "../service/auth.service.js";
export declare class LoginUseCase {
    private readonly userService;
    private readonly authService;
    constructor(userService: IUserService, authService: IAuthService);
    execute(data: LoginDto, sessionInfo?: Omit<ILoginSession, "sessionId" | "expiresAt" | "lastActiveAt" | "createdAt" | "location" | "tokenHash">): Promise<IAuthResponse>;
}
//# sourceMappingURL=login.use-case.d.ts.map