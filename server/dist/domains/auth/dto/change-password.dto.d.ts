import { z } from "zod";
export declare const changePasswordDtoSchema: z.ZodPipe<z.ZodObject<{
    currentPassword: z.ZodString;
    newPassword: z.ZodString;
    confirmNewPassword: z.ZodString;
}, z.core.$strict>, z.ZodTransform<{
    currentPassword: string;
    newPassword: string;
}, {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}>>;
export type ChangePasswordDto = z.infer<typeof changePasswordDtoSchema>;
//# sourceMappingURL=change-password.dto.d.ts.map