export class AppError extends Error {
  public readonly isOperational: boolean;
  public readonly context?: Record<string, unknown>;

  constructor(
    message: string,
    isOperational: boolean = true,
    context?: Record<string, unknown>,
  ) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = this.constructor.name;
    this.isOperational = isOperational;

    if (context !== undefined) {
      this.context = context;
    }

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
