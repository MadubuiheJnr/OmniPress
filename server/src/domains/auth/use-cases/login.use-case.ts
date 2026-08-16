import {
  BadRequestError,
  NotFoundError,
} from "../../../shared/errors/http.error.js";
import type { LoginDto } from "../dto/login.dto.js";
import type { IAuthResponse, ILoginSession } from "../types/auth.types.js";
import type { Types } from "mongoose";
import type { IUserService } from "../../user/types/user.types.js";
import type { AuthService as IAuthService } from "../service/auth.service.js";
import eventBus from "../../../shared/event/event-bus.js";

export class LoginUseCase {
  constructor(
    private readonly userService: IUserService,
    private readonly authService: IAuthService,
  ) {}

  async execute(
    data: LoginDto,
    sessionInfo?: Omit<
      ILoginSession,
      | "sessionId"
      | "expiresAt"
      | "lastActiveAt"
      | "createdAt"
      | "location"
      | "tokenHash"
    >,
  ): Promise<IAuthResponse> {
    const { identifier, password } = data;
    let authId: Types.ObjectId | null = null;

    if (!identifier || !password) {
      throw new BadRequestError(
        "Something is not right",
        "Email/Username and password are required",
      );
    }

    if (identifier.includes("@")) {
      authId = await this.authService.getUserIdByEmail(identifier);
    } else {
      authId = await this.userService.getUserIdByUsername(identifier);
    }

    if (!authId)
      throw new NotFoundError(
        "Invalid credentials",
        "Please check your credentials and try again",
      );

    const authResult = await this.authService.login(
      authId,
      password,
      sessionInfo,
    );

    const userProfile = await this.userService.getUserProfileById(authId);
    if (!userProfile) throw new NotFoundError("User profile not found");

    eventBus.emit("auth.loggedIn", {
      authId: authResult._id,
      email: authResult.email,
      location: "",
      device: sessionInfo?.device || "",
      browser: sessionInfo?.browser || "",
      userAgent: sessionInfo?.userAgent || "",
      createdAt: authResult.createdAt,
    });

    return {
      user: {
        _id: userProfile._id,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        username: userProfile.username,
        email: authResult.email,
        avatar: userProfile.avatar,
      },
      accessToken: authResult.accessToken,
      refreshToken: authResult.refreshToken,
    };
  }
}
