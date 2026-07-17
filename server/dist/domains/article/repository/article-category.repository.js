import { ArticleCategoryModel } from "../model/article-category.model.js";
export class ArticleCategoryRepository {
    async createCategory(data) {
        const category = new ArticleCategoryModel(data);
        return category.save();
    }
    async findOneBySlug(slug) {
        return ArticleCategoryModel.findOne({ slug });
    }
    async findOneByName(name) {
        return ArticleCategoryModel.findOne({ name });
    }
    async incArticleCount(id) {
        return ArticleCategoryModel.findByIdAndUpdate(id, { $inc: { articlesCount: 1 } }, { new: true });
    }
}
//# sourceMappingURL=article-category.repository.js.map