export class UploadService {
    uploadClient;
    constructor(uploadClient) {
        this.uploadClient = uploadClient;
    }
    getUploadAuth() {
        const expireInSeconds = 5 * 60; // 5 minutes
        return this.uploadClient.helper.getAuthenticationParameters(undefined, expireInSeconds);
    }
}
//# sourceMappingURL=upload.service.js.map