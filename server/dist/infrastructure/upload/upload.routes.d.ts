import { Router } from "express";
import type { UploadController as IUploadController } from "./upload.controller.js";
import type { AuthMiddleware as IAuthMiddleware } from "middlewares/auth.middleware.js";
export declare function createUploadRouter(uploadController: IUploadController, authMiddleware: IAuthMiddleware): Router;
//# sourceMappingURL=upload.routes.d.ts.map