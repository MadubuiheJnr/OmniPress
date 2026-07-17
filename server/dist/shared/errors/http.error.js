import { AppError } from "./app.error.js";
export var HttpCode;
(function (HttpCode) {
    HttpCode[HttpCode["OK"] = 200] = "OK";
    HttpCode[HttpCode["CREATED"] = 201] = "CREATED";
    HttpCode[HttpCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    HttpCode[HttpCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpCode[HttpCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpCode[HttpCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpCode[HttpCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpCode[HttpCode["CONFLICT"] = 409] = "CONFLICT";
    HttpCode[HttpCode["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
    HttpCode[HttpCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpCode || (HttpCode = {}));
export class BadRequestError extends AppError {
    statusCode = HttpCode.BAD_REQUEST;
    constructor(message = "Bad Request", detail = "Something went wrong with the request", context) {
        super(message, detail, context, true);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
export class UnauthorizedError extends AppError {
    statusCode = HttpCode.UNAUTHORIZED;
    constructor(message = "Unauthorized", detail = "You are not authorized to access this resource", context) {
        super(message, detail, context, true);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
export class ForbiddenError extends AppError {
    statusCode = HttpCode.FORBIDDEN;
    constructor(message = "Forbidden", detail = "You are not authorized to access this resource", context) {
        super(message, detail, context, true);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
export class NotFoundError extends AppError {
    statusCode = HttpCode.NOT_FOUND;
    constructor(message = "Resource not found", detail = "The requested resource was not found", context) {
        super(message, detail, context, true);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
export class ConflictError extends AppError {
    statusCode = HttpCode.CONFLICT;
    constructor(message = "Conflict", detail = "A conflict occurred while processing the request", context) {
        super(message, detail, context, true);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
export class UnprocessableEntityError extends AppError {
    statusCode = HttpCode.UNPROCESSABLE_ENTITY;
    constructor(message = "Unprocessable Entity", detail = "The request was unable to be followed", context) {
        super(message, detail, context, true);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
export class InternalServerError extends AppError {
    statusCode = HttpCode.INTERNAL_SERVER_ERROR;
    constructor(message = "Internal Server Error", detail = "An internal server error occurred", context) {
        super(message, detail, context, false);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
export function isHttpError(err) {
    return ("statusCode" in err &&
        typeof err.statusCode === "number");
}
//# sourceMappingURL=http.error.js.map