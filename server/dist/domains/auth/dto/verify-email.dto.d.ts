import { z } from "zod";
export declare const verifyEmailDtoSchema: z.ZodObject<{
    token: z.ZodString;
}, z.core.$strict>;
export type VerifyEmailDto = z.infer<typeof verifyEmailDtoSchema>;
//# sourceMappingURL=verify-email.dto.d.ts.map