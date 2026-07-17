import { ArticleModel, ArticlePostModel, ArticleReelModel, } from "../model/article.model.js";
export class ArticleRepository {
    async createPost(articleData) {
        const article = new ArticlePostModel(articleData);
        return article.save();
    }
    async createReel(articleData) {
        const article = new ArticleReelModel(articleData);
        return article.save();
    }
    async update(articleId, articleData) {
        return ArticleModel.findByIdAndUpdate(articleId, articleData, {
            new: true,
        });
    }
    async findById(articleId) {
        return ArticleModel.findById(articleId);
    }
    async findBySlug(slug, includeUnpublished = false) {
        const query = includeUnpublished ? { slug } : { slug, isPublished: true };
        return ArticleModel.findOne(query);
    }
    async getAllSlugs() {
        const docs = await ArticleModel.find({}, { slug: 1, _id: 0 }).lean().exec();
        return docs
            .map((d) => d.slug)
            .filter(Boolean);
    }
    async findAll(page, limit, categoryId) {
        const skip = (page - 1) * limit;
        const query = categoryId
            ? { category: categoryId, isPublished: true }
            : { isPublished: true };
        const [articles, totalItems] = await Promise.all([
            ArticleModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
            ArticleModel.countDocuments(query),
        ]);
        return { articles, totalItems };
    }
    async findByAuthor(authorId, page, limit) {
        const skip = (page - 1) * limit;
        const query = { author: authorId };
        const [articles, totalItems] = await Promise.all([
            ArticleModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
            ArticleModel.countDocuments(query),
        ]);
        return { articles, totalItems };
    }
    async incrementCounter(articleId, field, amount = 1) {
        return ArticleModel.findByIdAndUpdate(articleId, { $inc: { [field]: amount } }, { new: true });
    }
    async setPublishStatus(articleId, isPublished) {
        return ArticleModel.findByIdAndUpdate(articleId, { $set: { isPublished } }, { new: true });
    }
    async setArchiveStatus(articleId, isArchived) {
        return ArticleModel.findByIdAndUpdate(articleId, { $set: { isArchived } }, { new: true });
    }
    async delete(articleId) {
        return ArticleModel.findByIdAndDelete(articleId);
    }
}
//# sourceMappingURL=article.repository.js.map