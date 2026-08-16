import eventBus from "../../../shared/event/event-bus.js";
import { verificationTemplate } from "../templates/verification.template.js";
import { env } from "../../../config/env.js";
import type { NotificationService as INotificationService } from "../services/notification.service.js";

export function authRegisteredSubscriber(
  notificationService: INotificationService,
): void {
  eventBus.on("auth.registered", async (payload) => {
    try {
      const html = verificationTemplate({
        firstName: payload.firstName,
        verificationUrl: `${env.CLIENT_URL}/auth/verify-email?token=${payload.emailVerifyToken}`,
        expiryHours: 24,
      });

      await notificationService.sendEmail({
        to: payload.email,
        subject: "Verify your OmniPress account",
        html,
      });
    } catch (error) {
      console.error(
        "[auth.registered subscriber] Failed to send verification email:",
        error,
      );
    }
  });
}
