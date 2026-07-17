import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";
export declare const validateBody: <T>(schema: ZodType<T>) => (req: Request, _res: Response, next: NextFunction) => void;
export declare const validateQuery: <T extends Record<string, string>>(schema: ZodType<T>) => (req: Request, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=validate.middleware.d.ts.map