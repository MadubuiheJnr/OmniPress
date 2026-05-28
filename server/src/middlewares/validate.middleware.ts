import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";
import { BadRequestError } from "shared/errors/http.error.js";

export const validateBody =
  <T>(schema: ZodType<T>) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body, {
      error: (issues) => {
        if (issues.code === "invalid_format") {
          return "Please check your input data and try again";
        }
        if (issues.code === "invalid_element") {
          return "invalid_element";
        }
        if (issues.code === "invalid_key") {
          return "invalid_key";
        }
        if (issues.code === "invalid_type") {
          return "Please check your input data and try again";
        }
        if (issues.code === "invalid_union") {
          return "invalid_union";
        }
        if (issues.code === "invalid_value") {
          return "invalid_value";
        }
        if (issues.code === "not_multiple_of") {
          return "not_multiple_of";
        }
        if (issues.code === "unrecognized_keys") {
          return "unrecognized_keys";
        }
      },
    });

    if (!result.success) {
      const errorDetail =
        result.error.issues[0]?.message || "Invalid input, please try again";

      return next(new BadRequestError("Invalid input", errorDetail));
    }

    req.body = result.data;
    next();
  };
