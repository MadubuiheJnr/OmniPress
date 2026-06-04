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

export function createAuthRouter(
  authController: IAuthController,
  authMiddleware: IAuthMiddleware,
): Router {
  const router = Router();

  router.post("/register", validateBody(registerDtoSchema), (req, res, next) =>
    authController.register(req, res, next),
  );

  router.post("/login", validateBody(loginDtoSchema), (req, res, next) =>
    authController.login(req, res, next),
  );
  router.get(
    "/verify-email",
    validateQuery(verifyEmailDtoSchema),
    (req, res, next) => authController.verifyEmail(req, res, next),
  );

  return router;
}
