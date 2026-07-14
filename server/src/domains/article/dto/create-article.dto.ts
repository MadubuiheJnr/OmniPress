import { z } from "zod";

const tipTapNodeSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    type: z.string(),
    content: z.array(tipTapNodeSchema).optional(),
    text: z.string().optional(),
    marks: z
      .array(
        z.object({
          type: z.string(),
          attrs: z.record(z.string(), z.unknown()).optional(),
        }),
      )
      .optional(),
    attrs: z.record(z.string(), z.unknown()).optional(),
  }),
);

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
      title: z.string().min(5).max(200),
      excerpt: z.string().min(10).max(300),
      thumbnail: z.string().url("Thumbnail must be a valid URL"),
      content: tipTapDocumentSchema,
      category: categorySchema,
    })
    .strict(),
  z
    .object({
      contentType: z.literal("REEL"),
      title: z.string().min(5).max(200),
      excerpt: z.string().min(10).max(300),
      videoUrl: z.string().url("Must be a valid video URL"),
      duration: z.number().positive("Duration must be a positive number"),
      category: categorySchema,
    })
    .strict(),
]);

export type CreateArticleDto = z.infer<typeof createArticleDtoSchema>;
