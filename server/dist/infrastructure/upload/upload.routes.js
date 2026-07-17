import { Router } from "express";
export function createUploadRouter(uploadController, authMiddleware) {
    const router = Router();
    router.get("/auth", authMiddleware.authenticate, (req, res, next) => 
    // TODO: rate limit upload auth endpoint
    uploadController.getUploadAuth(req, res, next));
    return router;
}
//# sourceMappingURL=upload.routes.js.map