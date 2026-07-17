import { z } from "zod";
export declare const forgotPasswordDtoSchema: z.ZodObject<{
    email: z.ZodEmail;
}, z.core.$strict>;
export type ForgotPasswordDto = z.infer<typeof forgotPasswordDtoSchema>;
//# sourceMappingURL=forgot-password.dto.d.ts.map