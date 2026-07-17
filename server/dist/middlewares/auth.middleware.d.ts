import type { TokenService as ITokenService } from "domains/auth/service/token.service.js";
import type { Request, Response, NextFunction } from "express";
export declare class AuthMiddleware {
    private readonly tokenService;
    constructor(tokenService: ITokenService);
    authenticate: (req: Request, _res: Response, next: NextFunction) => void;
}
//# sourceMappingURL=auth.middleware.d.ts.map