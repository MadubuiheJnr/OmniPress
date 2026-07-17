import type { ImageKit } from "@imagekit/nodejs";
export declare class UploadService {
    private readonly uploadClient;
    constructor(uploadClient: ImageKit);
    getUploadAuth(): {
        token: string;
        expire: number;
        signature: string;
    };
}
//# sourceMappingURL=upload.service.d.ts.map