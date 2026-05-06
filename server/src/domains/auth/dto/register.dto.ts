import { z } from "zod";

export const registerDtoSchema = z
  .object({
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
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
    password: z.string().min(8).max(100),
  })
  .strict();

export type RegisterDto = z.infer<typeof registerDtoSchema>;
