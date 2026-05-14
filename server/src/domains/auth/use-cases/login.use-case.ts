import { BadRequestError } from "shared/errors/http.error.js";
import type { LoginDto } from "../dto/login.dto.js";
import type {
  IAuthResponse,
  IAuthService,
  ILoginSession,
} from "../types/auth.types.js";
import type { Types } from "mongoose";
import eventBus from "shared/event/event-bus.js";
import { signAccessToken, signRefreshToken } from "shared/utils/jwt.utils.js";
import type { IUserService } from "domains/user/types/user.types.js";

export class LoginUseCase {
  constructor(
    private readonly userService: IUserService,
    private readonly authService: IAuthService,
  ) {}

  async execute(
    data: LoginDto,
    sessionInfo?: Omit<
      ILoginSession,
      "sessionId" | "isCurrent" | "lastActiveAt" | "createdAt"
    >,
  ): Promise<IAuthResponse> {
    const { identifier, password } = data;
    let userId: Types.ObjectId | null = null;

    if (identifier.includes("@")) {
      userId = await this.authService.getUserIdByEmail(identifier);
    } else {
      userId = await this.userService.getUserIdByUsername(identifier);
    }

    if (!userId) throw new BadRequestError("Invalid credentials");

    const authResult = await this.authService.login(
      userId,
      password,
      sessionInfo,
    );

    const userProfile = await this.userService.getUserProfileById(userId);
    if (!userProfile) throw new BadRequestError("Profile data missing");

    const accessToken = signAccessToken({
      userId: userId.toString(),
      email: authResult.email,
    });
    const refreshToken = signRefreshToken({
      userId: userId.toString(),
      email: authResult.email,
    });

    eventBus.emit("auth.loggedIn", {
      userId: authResult._id,
      email: authResult.email,
      ip: sessionInfo?.ip || "",
      location: sessionInfo?.location || "",
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
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }
}
