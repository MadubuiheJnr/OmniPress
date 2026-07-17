import type { JSONContent } from "@tiptap/core";
export declare const ARTICLE_UTILS: {
    slugify_title: (title: string, existingSlug?: string[]) => string;
    generate_html: (doc: JSONContent) => string;
    calc_read_time: (json: JSONContent, wpm?: number) => string;
    sanitize_html: (html: string) => string;
};
//# sourceMappingURL=article.utils.d.ts.map