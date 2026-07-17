import { UnauthorizedError } from "shared/errors/http.error.js";
export class AuthMiddleware {
    tokenService;
    constructor(tokenService) {
        this.tokenService = tokenService;
    }
    authenticate = (req, _res, next) => {
        const authHeader = req.headers.authorization;
        const token = authHeader?.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : null;
        if (!token) {
            return next(new UnauthorizedError("Unauthorized", "You don't have permission to access this resource"));
        }
        const decoded = this.tokenService.verifyAccessToken(token);
        req.user = {
            _id: decoded.authId,
            email: decoded.email,
            sessionId: decoded.sessionId,
        };
        next();
    };
}
//# sourceMappingURL=auth.middleware.js.map