import type { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "shared/errors/http.error.js";
import { verifyAccessToken } from "shared/utils/jwt.utils.js";

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new UnauthorizedError(
      "Unauthorized",
      "You don't have permission to access this resource",
    );
  }

  const accessToken = authHeader.split(" ")[1];

  if (!accessToken) {
    throw new UnauthorizedError(
      "Unauthorized",
      "You don't have permission to access this resource",
    );
  }

  const decoded = verifyAccessToken(accessToken);

  req.user = {
    _id: decoded._id,
    email: decoded.email,
    sessionId: decoded.sessionId,
  };

  next();
};
