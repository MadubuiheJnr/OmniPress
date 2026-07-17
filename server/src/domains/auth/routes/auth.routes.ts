import { Router } from "express";
import type { AuthController as IAuthController } from "../controller/auth.controller.js";
import {
  validateBody,
  validateQuery,
} from "middlewares/validate.middleware.js";
import { registerDtoSchema } from "../dto/register.dto.js";
import { loginDtoSchema } from "../dto/login.dto.js";
import { verifyEmailDtoSchema } from "../dto/verify-email.dto.js";
import type { AuthMiddleware as IAuthMiddleware } from "middlewares/auth.middleware.js";

/**
 * @openapi
 * tags:
 *   - name: Auth
 *     description: User authentication, registration, email verification, and token refresh endpoints
 */

export function createAuthRouter(
  authController: IAuthController,
  authMiddleware: IAuthMiddleware,
): Router {
  const router = Router();

  /**
   * @openapi
   * /v1/auth/register:
   *   post:
   *     summary: Register a new user
   *     tags: [Auth]
   *     responses:
   *       201:
   *         description: User registered successfully
   */
  router.post("/register", validateBody(registerDtoSchema), (req, res, next) =>
    authController.register(req, res, next),
  );

  /**
   * @openapi
   * /v1/auth/login:
   *   post:
   *     summary: Log in a user
   *     tags: [Auth]
   *     responses:
   *       200:
   *         description: User logged in successfully
   */
  router.post("/login", validateBody(loginDtoSchema), (req, res, next) =>
    authController.login(req, res, next),
  );

  /**
   * @openapi
   * /v1/auth/verify-email:
   *   get:
   *     summary: Verify a user's email address
   *     tags: [Auth]
   *     responses:
   *       200:
   *         description: Email verified successfully
   */
  router.get(
    "/verify-email",
    validateQuery(verifyEmailDtoSchema),
    (req, res, next) => authController.verifyEmail(req, res, next),
  );

  /**
   * @openapi
   * /v1/auth/refresh:
   *   post:
   *     summary: Refresh an access token
   *     tags: [Auth]
   *     responses:
   *       200:
   *         description: Token refreshed successfully
   */
  router.post("/refresh", (req, res, next) =>
    authController.refresh(req, res, next),
  );

  return router;
}
