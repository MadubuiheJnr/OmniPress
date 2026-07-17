import { Router } from "express";
import swaggerUi from "swagger-ui-express";

export function createSwaggerDocsRouter(swaggerDocs: Object): Router {
  const router = Router();

  router.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  return router;
}
