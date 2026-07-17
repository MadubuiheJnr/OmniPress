import { env } from "config/env.js";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "OmniPress API Documentation",
      version: "1.0.0",
    },
  },
  apis:
    env.NODE_ENV === "production"
      ? ["./dist/app.js", "./dist/domains/auth/routes/auth.routes.js"]
      : ["./src/app.ts", "./src/domains/auth/routes/auth.routes.ts"],
};

export const swaggerDocs = swaggerJsdoc(options);
