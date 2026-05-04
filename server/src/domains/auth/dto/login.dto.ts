import { z } from "zod";

export const loginDtoSchema = z
  .object({
    email: z.email().trim().toLowerCase().optional(),
    username: z.string().trim().toLowerCase().optional(),
    password: z.string().min(8).max(100),
  })
  .strict()
  .refine((data) => data.email !== undefined || data.username !== undefined, {
    message: "Either email or username is required",
  });

export type LoginDto = z.infer<typeof loginDtoSchema>;
