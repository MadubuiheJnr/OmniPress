import { Router } from "express";
import type { AuthController as IAuthController } from "../controller/auth.controller.js";
import type { AuthMiddleware as IAuthMiddleware } from "middlewares/auth.middleware.js";
/**
 * @openapi
 * tags:
 *   - name: Auth
 *     description: User authentication, registration, email verification, and token refresh endpoints
 */
export declare function createAuthRouter(authController: IAuthController, authMiddleware: IAuthMiddleware): Router;
//# sourceMappingURL=auth.routes.d.ts.map