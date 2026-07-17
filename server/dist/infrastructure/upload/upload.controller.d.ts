import type { UploadService as IUploadService } from "./upload.service.js";
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: IUploadService);
    getUploadAuth: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=upload.controller.d.ts.map