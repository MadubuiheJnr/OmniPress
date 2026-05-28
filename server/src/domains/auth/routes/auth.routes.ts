import { Router } from "express";
import type { AuthController as IAuthController } from "../controller/auth.controller.js";
import { validateBody } from "middlewares/validate.middleware.js";
import { registerDtoSchema } from "../dto/register.dto.js";
import { loginDtoSchema } from "../dto/login.dto.js";

export function createAuthRouter(authController: IAuthController): Router {
  const router = Router();

  router.post("/register", validateBody(registerDtoSchema), (req, res, next) =>
    authController.register(req, res, next),
  );

  router.post("/login", validateBody(loginDtoSchema), (req, res, next) =>
    authController.login(req, res, next),
  );

  return router;
}
