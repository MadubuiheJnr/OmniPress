import { z } from "zod";
export declare const loginDtoSchema: z.ZodObject<{
    identifier: z.ZodString;
    password: z.ZodString;
}, z.core.$strict>;
export type LoginDto = z.infer<typeof loginDtoSchema>;
//# sourceMappingURL=login.dto.d.ts.map