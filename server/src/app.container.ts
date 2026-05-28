import { AuthController } from "domains/auth/controller/auth.controller.js";
import { AuthRepository } from "domains/auth/repository/auth.repository.js";
import { AuthService } from "domains/auth/service/auth.service.js";
import { LoginUseCase } from "domains/auth/use-cases/login.use-case.js";
import { RegisterUseCase } from "domains/auth/use-cases/register.use-case.js";
import { UserRepository } from "domains/user/index.js";
import { UserService } from "domains/user/service/user.service.js";

export interface AppContainer {
  authController: AuthController;
  // add other controllers here as your app grows
}

export function bootstrapContainer(): AppContainer {
  // 1. Repositories
  const authRepository = new AuthRepository();
  const userRepository = new UserRepository();

  // 2. Services
  const authService = new AuthService(authRepository);
  const userService = new UserService(userRepository);

  // 3. Use Cases
  const loginUseCase = new LoginUseCase(userService, authService);
  const registerUseCase = new RegisterUseCase(authService, userService);

  // 4. Controller
  const authController = new AuthController(loginUseCase, registerUseCase);

  return { authController };
}
