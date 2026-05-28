// src/middlewares/error.middleware.ts

import type { Request, Response, NextFunction } from "express";
import { env } from "../config/env.js";
import { AppError } from "../shared/errors/app.error.js";
import { HttpCode, isHttpError } from "../shared/errors/http.error.js";
import crypto from "node:crypto";

interface ErrorResponseBody {
  success: false;
  error: {
    type: string;
    title: string;
    status: number;
    detail: string;
    instance: string;
    timestamp: string;
    context?: Record<string, unknown>;
    stack?: string;
  };
}

const mapErrorToResponse = (
  err: Error | AppError,
): { statusCode: number; body: ErrorResponseBody } => {
  const isProduction = env.NODE_ENV === "production";
  const instance = `omni-press::${crypto.randomUUID()}`;
  const timestamp = new Date().toISOString();

  let statusCode = HttpCode.INTERNAL_SERVER_ERROR;
  let title = "Internal Server Error";
  let detail =
    "An unexpected error occurred. Please contact support if this continues.";
  let context: Record<string, unknown> | undefined;

  if (err instanceof AppError) {
    if (isHttpError(err)) {
      statusCode = err.statusCode;
    }
    if (err.isOperational) {
      title = err.message;
      detail = err.detail;
    }
    if (err.context !== undefined) {
      context = err.context;
    }
  }

  // log full error with correlation ID for server-side tracing
  console.error(`[${instance}]`, err);

  return {
    statusCode,
    body: {
      success: false,
      error: {
        type: err.constructor.name,
        title,
        status: statusCode,
        detail,
        instance,
        timestamp,
        ...(context !== undefined && { context }),
        ...(!isProduction && err.stack !== undefined && { stack: err.stack }),
      },
    },
  };
};

export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const { statusCode, body } = mapErrorToResponse(err);
  res.status(statusCode).json(body);
};
