import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";
import { BadRequestError } from "../shared/errors/http.error.js";

export const validateBody =
  <T>(schema: ZodType<T>) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body, {
      error: (issues) => {
        if (issues.code === "invalid_format") {
          return "Please check your input data and try again";
        }
        if (issues.code === "invalid_element") {
          return "One or more fields contain invalid values";
        }
        if (issues.code === "invalid_key") {
          return "Please check your input data and try again";
        }
        if (issues.code === "invalid_type") {
          return "Please check your input data and try again";
        }
        if (issues.code === "invalid_union") {
          return "Please check your input data and try again";
        }
        if (issues.code === "invalid_value") {
          return "One or more fields contain invalid values";
        }
        if (issues.code === "not_multiple_of") {
          return "One or more fields contain invalid values";
        }
        if (issues.code === "unrecognized_keys") {
          return "Request contains unexpected fields";
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

export const validateQuery =
  <T extends Record<string, string>>(schema: ZodType<T>) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query, {
      error: (issues) => {
        if (issues.code === "invalid_format") {
          return "Please check your input data and try again";
        }
        if (issues.code === "invalid_element") {
          return "One or more fields contain invalid values";
        }
        if (issues.code === "invalid_key") {
          return "Please check your input data and try again";
        }

        if (issues.code === "invalid_type") {
          return "Please check your input data and try again";
        }
        if (issues.code === "invalid_union") {
          return "Please check your input data and try again";
        }
        if (issues.code === "invalid_value") {
          return "One or more fields contain invalid values";
        }
        if (issues.code === "not_multiple_of") {
          return "One or more fields contain invalid values";
        }
        if (issues.code === "unrecognized_keys") {
          return "Request contains unexpected fields";
        }
      },
    });

    if (!result.success) {
      const errorDetail =
        result.error.issues[0]?.message || "Invalid input, please try again";

      return next(new BadRequestError("Invalid input", errorDetail));
    }

    req.validatedQuery = result.data;
    next();
  };
