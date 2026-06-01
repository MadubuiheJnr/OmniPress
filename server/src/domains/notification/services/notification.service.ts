import { env } from "config/env.js";
import type { Transporter } from "nodemailer";
import { InternalServerError } from "shared/errors/http.error.js";

export interface IMailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export class NotificationService {
  constructor(private readonly mailerTransporter: Transporter) {}
  async sendEmail(options: IMailOptions): Promise<void> {
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
