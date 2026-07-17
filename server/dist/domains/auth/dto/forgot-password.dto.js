import { z } from "zod";
export const forgotPasswordDtoSchema = z
    .object({
    email: z.email().toLowerCase().trim(),
})
    .strict();
//# sourceMappingURL=forgot-password.dto.js.map