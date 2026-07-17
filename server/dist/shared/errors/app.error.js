export class AppError extends Error {
    isOperational;
    detail;
    context;
    constructor(message, detail, context, isOperational = true) {
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
//# sourceMappingURL=app.error.js.map