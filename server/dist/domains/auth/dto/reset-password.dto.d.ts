import { z } from "zod";
export declare const resetPasswordDtoSchema: z.ZodPipe<z.ZodObject<{
    token: z.ZodString;
    newPassword: z.ZodString;
    confirmNewPassword: z.ZodString;
}, z.core.$strict>, z.ZodTransform<{
    token: string;
    newPassword: string;
}, {
    token: string;
    newPassword: string;
    confirmNewPassword: string;
}>>;
export type ResetPasswordDto = z.infer<typeof resetPasswordDtoSchema>;
//# sourceMappingURL=reset-password.dto.d.ts.map