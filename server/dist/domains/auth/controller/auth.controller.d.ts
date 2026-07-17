import type { LoginUseCase as ILoginUseCase } from "../use-cases/login.use-case.js";
import type { RegisterUseCase as IRegisterUseCase } from "../use-cases/register.use-case.js";
import type { Request, Response } from "express";
import type { AuthService as IAuthService } from "../service/auth.service.js";
import type { RefreshTokenUseCase as IRefreshTokenUseCase } from "../use-cases/refresh-token.use-case.js";
export declare class AuthController {
    private readonly loginUseCase;
    private readonly registerUseCase;
    private readonly authService;
    private readonly refreshTokenUseCase;
    constructor(loginUseCase: ILoginUseCase, registerUseCase: IRegisterUseCase, authService: IAuthService, refreshTokenUseCase: IRefreshTokenUseCase);
    register: (req: Request, res: Response, next: import("express").NextFunction) => void;
    verifyEmail: (req: Request, res: Response, next: import("express").NextFunction) => void;
    login: (req: Request, res: Response, next: import("express").NextFunction) => void;
    refresh: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=auth.controller.d.ts.map