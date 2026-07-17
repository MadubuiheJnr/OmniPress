import z from "zod";
export declare const createArticleCategorySchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    slug: z.ZodString;
}, z.z.core.$strip>;
export type CreateArticleCategoryDto = z.infer<typeof createArticleCategorySchema>;
//# sourceMappingURL=create-article-category.dto.d.ts.map