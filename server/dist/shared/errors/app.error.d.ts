export declare class AppError extends Error {
    readonly isOperational: boolean;
    readonly detail: string;
    readonly context?: Record<string, unknown>;
    constructor(message: string, detail: string, context?: Record<string, unknown>, isOperational?: boolean);
}
//# sourceMappingURL=app.error.d.ts.map