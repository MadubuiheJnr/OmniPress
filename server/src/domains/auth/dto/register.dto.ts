import { z } from "zod";

export const registerDtoSchema = z
  .object({
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
    username: z
      .string()
      .min(3)
      .max(30)
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
