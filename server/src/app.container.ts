import { mailerTransporter } from "config/mailer.js";
import { AuthController } from "domains/auth/controller/auth.controller.js";
import { AuthRepository } from "domains/auth/repository/auth.repository.js";
import { createAuthRouter } from "domains/auth/routes/auth.routes.js";
import { AuthService } from "domains/auth/service/auth.service.js";
import { TokenService } from "domains/auth/service/token.service.js";
import { LoginUseCase } from "domains/auth/use-cases/login.use-case.js";
import { RefreshTokenUseCase } from "domains/auth/use-cases/refresh-token.use-case.js";
import { RegisterUseCase } from "domains/auth/use-cases/register.use-case.js";
import { NotificationService } from "domains/notification/services/notification.service.js";
import { authRegisteredSubscriber } from "domains/notification/subscribers/auth.registered.subscriber.js";
import { UserRepository } from "domains/user/index.js";
import { UserService } from "domains/user/service/user.service.js";
import type { Router } from "express";
import uploadClient from "infrastructure/upload/upload.client.js";
import { UploadController } from "infrastructure/upload/upload.controller.js";
import { createUploadRouter } from "infrastructure/upload/upload.routes.js";
import { UploadService } from "infrastructure/upload/upload.service.js";
import jwt from "jsonwebtoken";
import { AuthMiddleware } from "middlewares/auth.middleware.js";

export interface AppContainer {
  authRouter: Router;
  uploadRouter: Router;
  // add other routes here as your app grows
}

export function bootstrapContainer(): AppContainer {
  // 1. Repositories
  const authRepository = new AuthRepository();
  const userRepository = new UserRepository();

  // 2. Services
  const tokenService = new TokenService(authRepository, jwt);
  const authService = new AuthService(authRepository, tokenService);
  const userService = new UserService(userRepository);
  const notificationService = new NotificationService(mailerTransporter);
  const uploadService = new UploadService(uploadClient);

  // 3. Use Cases
  const loginUseCase = new LoginUseCase(userService, authService);
  const registerUseCase = new RegisterUseCase(authService, userService);
  const refreshTokenUseCase = new RefreshTokenUseCase(userService, authService);

  // 4. Controller
  const authController = new AuthController(
    loginUseCase,
    registerUseCase,
    authService,
    refreshTokenUseCase,
  );
  const uploadController = new UploadController(uploadService);

  // 5. Middleware
  const authMiddleware = new AuthMiddleware(tokenService);

  // 6. Routers
  const authRouter = createAuthRouter(authController, authMiddleware);
  const uploadRouter = createUploadRouter(uploadController, authMiddleware);

  // 7. Subscribers

  authRegisteredSubscriber(notificationService);

  return { authRouter, uploadRouter };
}
