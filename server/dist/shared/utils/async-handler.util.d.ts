import type { Request, Response, NextFunction } from "express";
type AsyncController = (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const asyncHandler: (fn: AsyncController) => (req: Request, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=async-handler.util.d.ts.map