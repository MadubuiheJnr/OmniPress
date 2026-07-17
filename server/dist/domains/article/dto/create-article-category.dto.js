import z from "zod";
export const createArticleCategorySchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters long")
        .max(50, "Name must be at most 50 characters long"),
    description: z.string().min(10).max(300),
    slug: z.string().min(2).max(50),
});
//# sourceMappingURL=create-article-category.dto.js.map