import { Router } from "express";
import swaggerUi from "swagger-ui-express";
export function createSwaggerDocsRouter(swaggerDocs) {
    const router = Router();
    router.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    return router;
}
//# sourceMappingURL=swagger-docs.routes.js.map