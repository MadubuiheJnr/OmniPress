import { z } from "zod";
export declare const createArticleDtoSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    contentType: z.ZodLiteral<"POST">;
    title: z.ZodString;
    excerpt: z.ZodString;
    thumbnail: z.ZodURL;
    content: z.ZodObject<{
        type: z.ZodLiteral<"doc">;
        content: z.ZodArray<z.ZodType<any, unknown, z.core.$ZodTypeInternals<any, unknown>>>;
    }, z.core.$strip>;
    category: z.ZodString;
}, z.core.$strict>, z.ZodObject<{
    contentType: z.ZodLiteral<"REEL">;
    title: z.ZodString;
    excerpt: z.ZodString;
    videoUrl: z.ZodURL;
    duration: z.ZodNumber;
    category: z.ZodString;
}, z.core.$strict>], "contentType">;
export type CreateArticleDto = z.infer<typeof createArticleDtoSchema>;
//# sourceMappingURL=create-article.dto.d.ts.map