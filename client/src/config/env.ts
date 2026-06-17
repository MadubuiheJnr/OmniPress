import { z } from "zod";

const envSchema = z.object({
  VITE_API_BASE_URL: z.url(),
});

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
  console.error(
    "❌ Invalid environment variables:\n",
    z.treeifyError(parsed.error),
  );
}

export const env = parsed.data;
