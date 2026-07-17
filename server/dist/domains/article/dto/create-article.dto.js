import { z } from "zod";
const tipTapNodeSchema = z.lazy(() => z.object({
    type: z.string("Node type must be a string"),
    content: z
        .array(tipTapNodeSchema, "Content must be an array of valid nodes")
        .optional(),
    text: z.string("Text must be a string").optional(),
    marks: z
        .array(z.object({
        type: z.string("Mark type must be a string"),
        attrs: z
            .record(z.string("Attribute key must be a string"), z.unknown())
            .optional(),
    }))
        .optional(),
    attrs: z
        .record(z.string("Attribute key must be a string"), z.unknown())
        .optional(),
}));
const tipTapDocumentSchema = z.object({
    type: z.literal("doc"),
    content: z.array(tipTapNodeSchema).min(1, "Content cannot be empty"),
});
const categorySchema = z
    .string()
    .min(2, "Category must be at least 2 characters long")
    .max(50, "Category must be at most 50 characters long");
export const createArticleDtoSchema = z.discriminatedUnion("contentType", [
    z
        .object({
        contentType: z.literal("POST"),
        title: z
            .string()
            .min(5, "Title must be at least 5 characters long")
            .max(200, "Title must be at most 200 characters long"),
        excerpt: z
            .string()
            .min(10, "Excerpt must be at least 10 characters long")
            .max(300, "Excerpt must be at most 300 characters long"),
        thumbnail: z.url("Thumbnail must be a valid URL"),
        content: tipTapDocumentSchema,
        category: categorySchema,
    })
        .strict(),
    z
        .object({
        contentType: z.literal("REEL"),
        title: z
            .string()
            .min(5, "Title must be at least 5 characters long")
            .max(200, "Title must be at most 200 characters long"),
        excerpt: z
            .string()
            .min(10, "Excerpt must be at least 10 characters long")
            .max(300, "Excerpt must be at most 300 characters long"),
        videoUrl: z.url("Must be a valid video URL"),
        duration: z
            .number()
            .positive("Duration must be a positive number")
            .min(30, "Duration must be at least 30 seconds")
            .max(300, "Duration must be at most 300 seconds"),
        category: categorySchema,
    })
        .strict(),
]);
//# sourceMappingURL=create-article.dto.js.map