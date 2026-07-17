import { env } from "config/env.js";
import { InternalServerError } from "shared/errors/http.error.js";
export class NotificationService {
    mailerTransporter;
    constructor(mailerTransporter) {
        this.mailerTransporter = mailerTransporter;
    }
    async sendEmail(options) {
        const info = await this.mailerTransporter.sendMail({
            from: `OmniPress <${env.EMAIL_USER}>`,
            to: options.to,
            subject: options.subject,
            html: options.html,
            text: options.text,
        });
        if (info.rejected.length > 0) {
            throw new InternalServerError("Failed to send email");
        }
    }
}
//# sourceMappingURL=notification.service.js.map