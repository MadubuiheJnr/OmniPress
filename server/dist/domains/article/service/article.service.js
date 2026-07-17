import { BadRequestError } from "shared/errors/http.error.js";
import { ARTICLE_UTILS } from "../article.utils.js";
export class ArticleService {
    articleRepository;
    constructor(articleRepository) {
        this.articleRepository = articleRepository;
    }
    async create(data) {
        const existingSlugs = await this.articleRepository.getAllSlugs();
        const { contentType } = data;
        switch (contentType) {
            case "POST":
                return this.createArticlePost(data, existingSlugs);
            case "REEL":
                return this.createArticleReel(data, existingSlugs);
            default: {
                const _exhaustive = contentType;
                throw new BadRequestError("Invalid content type");
            }
        }
    }
    async createArticlePost(data, existingSlugs) {
        const { title, contentJson, thumbnail, excerpt, category, author } = data;
        const slug = ARTICLE_UTILS.slugify_title(title, existingSlugs);
        const readingTime = ARTICLE_UTILS.calc_read_time(contentJson);
        const HTML = ARTICLE_UTILS.generate_html(contentJson);
        const sanitizedHTML = ARTICLE_UTILS.sanitize_html(HTML);
        const newArticlePost = await this.articleRepository.createPost({
            title,
            slug,
            contentJson,
            readingTime,
            contentHtml: sanitizedHTML,
            thumbnail,
            excerpt,
            category,
            author,
        });
        return newArticlePost._id;
    }
    async createArticleReel(data, existingSlugs) {
        const { title, author, excerpt, category, duration, videoUrl } = data;
        const slug = ARTICLE_UTILS.slugify_title(title, existingSlugs);
        const newArticleReel = await this.articleRepository.createReel({
            title,
            slug,
            excerpt,
            category,
            author,
            duration,
            videoUrl,
        });
        return newArticleReel._id;
    }
}
//# sourceMappingURL=article.service.js.map