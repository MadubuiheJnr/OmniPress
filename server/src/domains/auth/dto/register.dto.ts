import { z } from "zod";

export const registerDtoSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .max(50, "First name must be at most 50 characters long"),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .max(50, "Last name must be at most 50 characters long"),
    username: z
      .string()
      .min(6, "Username must be at least 6 characters long")
      .max(15, "Username must be at most 15 characters long")
      .trim()
      .toLowerCase()
      .regex(
        /^[a-z0-9_]+$/,
        "Username can only contain letters, numbers and underscores",
      ),
    email: z.email().trim().toLowerCase(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(100, "Password must be at most 100 characters long"),
  })
  .strict();

export type RegisterDto = z.infer<typeof registerDtoSchema>;
