interface ErrorResponseBody {
  success: false;
  error: {
    type: string;
    title: string;
    status: number;
    detail: string;
    context?: Record<string, unknown>;
    stack?: string;
  };
}

export const mapErrorToResponse = (
  err: Error | AppError,
  isProduction: boolean,
): { statusCode: number; body: ErrorResponseBody } => {
  let statusCode = HttpCode.INTERNAL_SERVER_ERROR;
  let detail = "An unexpected error occurred";
  let context: Record<string, unknown> | undefined;

  if (err instanceof AppError) {
    if (isHttpError(err)) {
      statusCode = err.statusCode;
    }
    if (err.isOperational || !isProduction) {
      detail = err.message;
    }
    if (err.context !== undefined) {
      context = err.context;
    }
  }

  return {
    statusCode,
    body: {
      success: false,
      error: {
        type: err.constructor.name,
        title: err.name,
        status: statusCode,
        detail,
        ...(context !== undefined && { context }),
        ...(!isProduction && err.stack !== undefined && { stack: err.stack }),
      },
    },
  };
};
