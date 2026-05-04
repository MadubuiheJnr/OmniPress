import { z } from "zod";

export const resetPasswordDtoSchema = z
  .object({
    token: z.string().min(1),
    newPassword: z.string().min(8).max(100),
    confirmNewPassword: z.string().min(8).max(100),
  })
  .strict()
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  })
  .transform(({ confirmNewPassword: _, ...rest }) => rest);
export type ResetPasswordDto = z.infer<typeof resetPasswordDtoSchema>;
