import { ConflictError, NotFoundError } from "shared/errors/http.error.js";
export class ArticleCategoryService {
    articleCategoryRepository;
    constructor(articleCategoryRepository) {
        this.articleCategoryRepository = articleCategoryRepository;
    }
    async createCategory(data) {
        const categoryExist = await this.articleCategoryRepository.findOneByName(data.name);
        const slugExist = await this.articleCategoryRepository.findOneBySlug(data.slug);
        if (categoryExist)
            throw new ConflictError("Category already exist", "Try again with with a different name");
        if (slugExist)
            throw new ConflictError("Slug already exist", "Try again with with a different slug");
        const category = await this.articleCategoryRepository.createCategory(data);
        return category;
    }
    async findCategoryBySlug(slug) {
        const category = await this.articleCategoryRepository.findOneBySlug(slug);
        if (!category)
            throw new NotFoundError("Category not found", "Please select a valid category and try again");
        return category;
    }
}
//# sourceMappingURL=article-category.service.js.map