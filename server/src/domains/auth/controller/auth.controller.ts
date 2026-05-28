import { HttpCode } from "shared/errors/http.error.js";
import type { ILoginSession } from "../types/auth.types.js";
import type { LoginUseCase as ILoginUseCase } from "../use-cases/login.use-case.js";
import type { RegisterUseCase as IRegisterUseCase } from "../use-cases/register.use-case.js";
import type { Request, Response } from "express";
import { asyncHandler } from "shared/utils/async-handler.util.js";
import { buildSuccess } from "shared/utils/response.util.js";
import { UAParser } from "ua-parser-js";

export class AuthController {
  constructor(
    private readonly loginUseCase: ILoginUseCase,
    private readonly registerUseCase: IRegisterUseCase,
  ) {}

  register = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.registerUseCase.execute(req.body);

    res
      .status(HttpCode.CREATED)
      .json(
        buildSuccess(
          { email: result.email },
          "Registration successful. Please check your email to verify your account.",
          HttpCode.CREATED,
        ),
      );
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const parser = new UAParser(req.headers["user-agent"]);

    const sessionInfo: Omit<
      ILoginSession,
      | "sessionId"
      | "isCurrent"
      | "lastActiveAt"
      | "createdAt"
      | "location"
      | "tokenHash"
    > = {
      ip:
        (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ??
        req.socket.remoteAddress ??
        "unknown",
      device:
        `${parser.getDevice().vendor ?? ""} ${parser.getDevice().model ?? ""}`.trim() ||
        "unknown",
      browser:
        `${parser.getBrowser().name ?? ""} ${parser.getBrowser().version ?? ""}`.trim() ||
        "unknown",
      userAgent: req.headers["user-agent"] ?? "unknown",
    };

    const result = await this.loginUseCase.execute(req.body, sessionInfo);

    res.status(HttpCode.OK).json(buildSuccess(result, "Login successful."));
  });
}
