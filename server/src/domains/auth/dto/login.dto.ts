import { z } from "zod";

export const loginDtoSchema = z
  .object({
    identifier: z.string().trim().toLowerCase().min(3).max(100),
    password: z.string().min(8).max(100),
  })
  .strict();

export type LoginDto = z.infer<typeof loginDtoSchema>;
