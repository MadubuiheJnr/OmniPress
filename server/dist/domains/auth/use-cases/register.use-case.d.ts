import type { IUserService } from "domains/user/types/user.types.js";
import type { AuthService as IAuthService } from "../service/auth.service.js";
import type { IAuthUser } from "../types/auth.types.js";
import type { RegisterDto } from "../dto/register.dto.js";
export declare class RegisterUseCase {
    private readonly authService;
    private readonly userService;
    constructor(authService: IAuthService, userService: IUserService);
    execute(data: RegisterDto): Promise<Pick<IAuthUser, "email">>;
}
//# sourceMappingURL=register.use-case.d.ts.map