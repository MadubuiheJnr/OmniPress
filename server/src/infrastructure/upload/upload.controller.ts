import { asyncHandler } from "../../shared/utils/async-handler.util.js";
import type { UploadService as IUploadService } from "./upload.service.js";
import { buildSuccess } from "../../shared/utils/response.util.js";

export class UploadController {
  constructor(private readonly uploadService: IUploadService) {}
  getUploadAuth = asyncHandler(async (req, res) => {
    const authParams = this.uploadService.getUploadAuth();
    res
      .status(200)
      .json(buildSuccess(authParams, "Upload authentication generated"));
  });
}
