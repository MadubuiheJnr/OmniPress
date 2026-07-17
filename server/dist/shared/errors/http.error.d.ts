import { AppError } from "./app.error.js";
export declare enum HttpCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    UNPROCESSABLE_ENTITY = 422,
    INTERNAL_SERVER_ERROR = 500
}
export declare class BadRequestError extends AppError {
    readonly statusCode = HttpCode.BAD_REQUEST;
    constructor(message?: string, detail?: string, context?: Record<string, unknown>);
}
export declare class UnauthorizedError extends AppError {
    readonly statusCode = HttpCode.UNAUTHORIZED;
    constructor(message?: string, detail?: string, context?: Record<string, unknown>);
}
export declare class ForbiddenError extends AppError {
    readonly statusCode = HttpCode.FORBIDDEN;
    constructor(message?: string, detail?: string, context?: Record<string, unknown>);
}
export declare class NotFoundError extends AppError {
    readonly statusCode = HttpCode.NOT_FOUND;
    constructor(message?: string, detail?: string, context?: Record<string, unknown>);
}
export declare class ConflictError extends AppError {
    readonly statusCode = HttpCode.CONFLICT;
    constructor(message?: string, detail?: string, context?: Record<string, unknown>);
}
export declare class UnprocessableEntityError extends AppError {
    readonly statusCode = HttpCode.UNPROCESSABLE_ENTITY;
    constructor(message?: string, detail?: string, context?: Record<string, unknown>);
}
export declare class InternalServerError extends AppError {
    readonly statusCode = HttpCode.INTERNAL_SERVER_ERROR;
    constructor(message?: string, detail?: string, context?: Record<string, unknown>);
}
export interface HttpAppError extends AppError {
    statusCode: number;
}
export declare function isHttpError(err: AppError): err is HttpAppError;
//# sourceMappingURL=http.error.d.ts.map