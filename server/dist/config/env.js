import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();
const envSchema = z.object({
    PORT: z.coerce.number().int().positive().default(3000),
    NODE_ENV: z
        .enum(["development", "production", "test"])
        .default("development"),
    // database
    MONGODB_URI: z.string().min(1),
    // jwt
    ACCESS_TOKEN_SECRET: z.string().min(1),
    ACCESS_TOKEN_EXPIRY: z.coerce.number().int().positive().default(900), // 15 minutes
    REFRESH_TOKEN_SECRET: z.string().min(1),
    REFRESH_TOKEN_EXPIRY: z.coerce.number().int().positive().default(604800), // 7 days
    // client
    CLIENT_URL: z.url(),
    // email
    EMAIL_FROM: z.email(),
    EMAIL_HOST: z.string().min(1),
    EMAIL_PORT: z.coerce.number().default(587),
    EMAIL_USER: z.string().min(1),
    EMAIL_PASS: z.string().min(1),
    // imagekit
    IMAGEKIT_PUBLIC_KEY: z.string().min(1),
    IMAGEKIT_PRIVATE_KEY: z.string().min(1),
    IMAGEKIT_URL_ENDPOINT: z.url(),
    // gemini
    GEMINI_API_KEY: z.string().min(1),
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    console.error("❌ Invalid environment variables:\n", z.treeifyError(parsed.error));
    process.exit(1);
}
export const env = parsed.data;
//# sourceMappingURL=env.js.map