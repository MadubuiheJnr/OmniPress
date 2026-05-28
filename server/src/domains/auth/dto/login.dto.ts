import { z } from "zod";

export const loginDtoSchema = z
  .object({
    identifier: z
      .string()
      .trim()
      .toLowerCase()
      .min(3, "Enter a valid username or email")
      .max(100, "Enter a valid username or email"),
    password: z
      .string()
      .min(8, "Password is too short")
      .max(100, "Password is too long"),
  })
  .strict();

export type LoginDto = z.infer<typeof loginDtoSchema>;
