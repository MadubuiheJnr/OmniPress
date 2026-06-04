import type { TokenService as ITokenService } from "domains/auth/service/token.service.js";
import type { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "shared/errors/http.error.js";

export class AuthMiddleware {
  constructor(private readonly tokenService: ITokenService) {}

  authenticate = (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      return next(
        new UnauthorizedError(
          "Unauthorized",
          "You don't have permission to access this resource",
        ),
      );
    }
    const decoded = this.tokenService.verifyAccessToken(token);

    req.user = {
      _id: decoded.userId,
      email: decoded.email,
      sessionId: decoded.sessionId,
    };

    next();
  };
}
