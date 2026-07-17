import type { Transporter } from "nodemailer";
export interface IMailOptions {
    to: string;
    subject: string;
    html: string;
    text?: string;
}
export declare class NotificationService {
    private readonly mailerTransporter;
    constructor(mailerTransporter: Transporter);
    sendEmail(options: IMailOptions): Promise<void>;
}
//# sourceMappingURL=notification.service.d.ts.map