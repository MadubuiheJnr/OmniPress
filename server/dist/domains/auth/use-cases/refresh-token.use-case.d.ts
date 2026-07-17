import type { UserService as IUserService } from "domains/user/service/user.service.js";
import type { AuthService as IAuthService } from "../service/auth.service.js";
import type { IAuthResponse } from "../types/auth.types.js";
export declare class RefreshTokenUseCase {
    private readonly userService;
    private readonly authService;
    constructor(userService: IUserService, authService: IAuthService);
    execute(incomingRefreshToken: string): Promise<IAuthResponse>;
}
//# sourceMappingURL=refresh-token.use-case.d.ts.map