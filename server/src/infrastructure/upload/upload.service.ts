import type { ImageKit } from "@imagekit/nodejs";

export class UploadService {
  constructor(private readonly uploadClient: ImageKit) {}
  getUploadAuth() {
    const expireInSeconds = 5 * 60; // 5 minutes
    return this.uploadClient.helper.getAuthenticationParameters(
      undefined,
      expireInSeconds,
    );
  }
}
