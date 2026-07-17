import { HttpCode, UnauthorizedError } from "shared/errors/http.error.js";
import { asyncHandler } from "shared/utils/async-handler.util.js";
import { buildSuccess } from "shared/utils/response.util.js";
import { UAParser } from "ua-parser-js";
import { env } from "config/env.js";
export class AuthController {
    loginUseCase;
    registerUseCase;
    authService;
    refreshTokenUseCase;
    constructor(loginUseCase, registerUseCase, authService, refreshTokenUseCase) {
        this.loginUseCase = loginUseCase;
        this.registerUseCase = registerUseCase;
        this.authService = authService;
        this.refreshTokenUseCase = refreshTokenUseCase;
    }
    register = asyncHandler(async (req, res) => {
        const result = await this.registerUseCase.execute(req.body);
        res
            .status(HttpCode.CREATED)
            .json(buildSuccess({ email: result.email }, "Registration successful. Please check your email to verify your account.", HttpCode.CREATED));
    });
    verifyEmail = asyncHandler(async (req, res) => {
        const { token } = req.validatedQuery;
        await this.authService.verifyEmail({ token });
        const callbackUrl = `/auth/login`;
        res
            .status(HttpCode.OK)
            .json(buildSuccess({ callbackUrl }, "Email verified successfully."));
    });
    login = asyncHandler(async (req, res) => {
        const parser = new UAParser(req.headers["user-agent"]);
        const sessionInfo = {
            ip: req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ??
                req.socket.remoteAddress ??
                "unknown",
            device: `${parser.getDevice().vendor ?? ""} ${parser.getDevice().model ?? ""}`.trim() ||
                "unknown",
            browser: `${parser.getBrowser().name ?? ""} ${parser.getBrowser().version ?? ""}`.trim() ||
                "unknown",
            userAgent: req.headers["user-agent"] ?? "unknown",
        };
        const loginResult = await this.loginUseCase.execute(req.body, sessionInfo);
        const { accessToken, refreshToken } = loginResult;
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
            path: "/v1/auth/refresh",
        });
        const result = {
            user: loginResult.user,
            token: accessToken,
        };
        res.status(HttpCode.OK).json(buildSuccess(result, "Login successful."));
    });
    refresh = asyncHandler(async (req, res) => {
        const incomingRefreshToken = req.cookies.refreshToken;
        if (!incomingRefreshToken) {
            throw new UnauthorizedError("You're not logged in", "Your request cannot be processed. Please login again to continue.");
        }
        const { accessToken, refreshToken, user } = await this.refreshTokenUseCase.execute(incomingRefreshToken);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
            path: "/v1/auth/refresh",
        });
        const result = {
            user,
            token: accessToken,
        };
        res.status(HttpCode.OK).json(buildSuccess(result, "OK"));
    });
}
//# sourceMappingURL=auth.controller.js.map