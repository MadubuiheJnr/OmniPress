import { z } from "zod";
export const verifyEmailDtoSchema = z
    .object({
    token: z.string().min(1),
})
    .strict();
//# sourceMappingURL=verify-email.dto.js.map