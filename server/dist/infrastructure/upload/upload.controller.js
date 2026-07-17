import { asyncHandler } from "shared/utils/async-handler.util.js";
import { buildSuccess } from "shared/utils/response.util.js";
export class UploadController {
    uploadService;
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    getUploadAuth = asyncHandler(async (req, res) => {
        const authParams = this.uploadService.getUploadAuth();
        res
            .status(200)
            .json(buildSuccess(authParams, "Upload authentication generated"));
    });
}
//# sourceMappingURL=upload.controller.js.map