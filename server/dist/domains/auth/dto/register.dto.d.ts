import { z } from "zod";
export declare const registerDtoSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    username: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strict>;
export type RegisterDto = z.infer<typeof registerDtoSchema>;
//# sourceMappingURL=register.dto.d.ts.map