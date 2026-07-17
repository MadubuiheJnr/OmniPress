import { z } from "zod";
export const changePasswordDtoSchema = z
    .object({
    currentPassword: z.string().min(8).max(100),
    newPassword: z.string().min(8).max(100),
    confirmNewPassword: z.string().min(8).max(100),
})
    .strict()
    .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New passwords do not match",
    path: ["confirmNewPassword"],
})
    .transform(({ confirmNewPassword: _, ...rest }) => rest);
//# sourceMappingURL=change-password.dto.js.map