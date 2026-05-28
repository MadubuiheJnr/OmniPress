export class AppError extends Error {
  public readonly isOperational: boolean;
  public readonly detail: string;
  public readonly context?: Record<string, unknown>;

  constructor(
    message: string,
    detail: string,
    context?: Record<string, unknown>,
    isOperational: boolean = true,
  ) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = this.constructor.name;
    this.detail = detail;
    this.isOperational = isOperational;

    if (context !== undefined) {
      this.context = context;
    }

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
