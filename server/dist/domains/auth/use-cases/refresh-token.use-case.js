import { NotFoundError } from "shared/errors/http.error.js";
export class RefreshTokenUseCase {
    userService;
    authService;
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async execute(incomingRefreshToken) {
        const { accessToken, refreshToken, authId, email } = await this.authService.refresh(incomingRefreshToken);
        const userProfile = await this.userService.getUserProfileById(authId);
        if (!userProfile)
            throw new NotFoundError("User profile not found");
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
//# sourceMappingURL=refresh-token.use-case.js.map