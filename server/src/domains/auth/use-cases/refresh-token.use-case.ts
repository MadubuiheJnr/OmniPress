import type { UserService as IUserService } from "../../user/service/user.service.js";
import type { AuthService as IAuthService } from "../service/auth.service.js";
import { NotFoundError } from "../../../shared/errors/http.error.js";
import type { IAuthResponse } from "../types/auth.types.js";

export class RefreshTokenUseCase {
  constructor(
    private readonly userService: IUserService,
    private readonly authService: IAuthService,
  ) {}

  async execute(incomingRefreshToken: string): Promise<IAuthResponse> {
    const { accessToken, refreshToken, authId, email } =
      await this.authService.refresh(incomingRefreshToken);
    const userProfile = await this.userService.getUserProfileById(authId);
    if (!userProfile) throw new NotFoundError("User profile not found");

    return {
      user: {
        _id: userProfile._id,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        username: userProfile.username,
        avatar: userProfile.avatar,
        email,
      },
      accessToken,
      refreshToken,
    };
  }
}
