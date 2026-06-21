import { Router } from "express";
import type { UploadController as IUploadController } from "./upload.controller.js";
import type { AuthMiddleware as IAuthMiddleware } from "middlewares/auth.middleware.js";

export function createUploadRouter(
  uploadController: IUploadController,
  authMiddleware: IAuthMiddleware,
): Router {
  const router = Router();

  router.get("/auth", authMiddleware.authenticate, (req, res, next) =>
    // TODO: rate limit upload auth endpoint
    uploadController.getUploadAuth(req, res, next),
  );

  return router;
}
