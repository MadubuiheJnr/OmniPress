import type { IUserService } from "domains/user/types/user.types.js";
import type { AuthService as IAuthService } from "../service/auth.service.js";
import type { IAuthUser } from "../types/auth.types.js";
import type { RegisterDto } from "../dto/register.dto.js";
import {
  ConflictError,
  InternalServerError,
} from "shared/errors/http.error.js";
import eventBus from "shared/event/event-bus.js";
import { AppError } from "shared/errors/app.error.js";
import mongoose from "mongoose";

export class RegisterUseCase {
  constructor(
    private readonly authService: IAuthService,
    private readonly userService: IUserService,
  ) {}

  async execute(data: RegisterDto): Promise<Pick<IAuthUser, "email">> {
    const { firstName, lastName, username, email, password } = data;

    const emailExists = await this.authService.getUserIdByEmail(email);
    if (emailExists)
      throw new ConflictError(
        "Email already in use",
        "Please use a different email address",
      );

    const usernameExists = await this.userService.getUserIdByUsername(username);
    if (usernameExists)
      throw new ConflictError(
        "Username is not available",
        "Please use a different username",
      );

    const session = await mongoose.startSession();

    try {
      const auth = await session.withTransaction(async () => {
        const newAuth = await this.authService.createAuth(
          {
            email,
            password,
          },
          { session },
        );

        const newUser = await this.userService.createUser(
          {
            _id: newAuth._id,
            firstName,
            lastName,
            username,
          },
          { session },
        );

        return {
          _id: newAuth._id,
          email: newAuth.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          emailVerifyToken: newAuth.emailVerifyToken,
        };
      });

      if (!auth) {
        throw new InternalServerError("Registration failed. Please try again.");
      }

      eventBus.emit("auth.registered", {
        authId: auth._id,
        firstName: auth.firstName,
        email: auth.email,
        emailVerifyToken: auth.emailVerifyToken,
      });

      return {
        email: auth.email,
      };
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof AppError) throw error;
      throw new InternalServerError("Registration failed. Please try again.");
    } finally {
      session.endSession();
    }
  }
}
