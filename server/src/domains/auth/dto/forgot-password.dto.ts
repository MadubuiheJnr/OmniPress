import { z } from "zod";

export const forgotPasswordDtoSchema = z
  .object({
    email: z.email().toLowerCase().trim(),
  })
  .strict();

export type ForgotPasswordDto = z.infer<typeof forgotPasswordDtoSchema>;
