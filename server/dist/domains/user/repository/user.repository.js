import UserModel from "../model/user.model.js";
export class UserRepository {
    async findById(id) {
        return UserModel.findById(id);
    }
    async findByIdSelect(id, fields) {
        return UserModel.findById(id).select(fields);
    }
    async findByUsername(username) {
        return UserModel.findOne({ username });
    }
    async create(userData, options) {
        const user = new UserModel(userData);
        return user.save({ session: options?.session });
    }
    async updateById(id, updateData) {
        return UserModel.findByIdAndUpdate(id, updateData, { new: true });
    }
    async deleteById(id) {
        return UserModel.findByIdAndDelete(id);
    }
    async addFollower(userId, followerId) {
        return UserModel.findByIdAndUpdate(userId, { $addToSet: { followers: followerId } }, { new: true });
    }
    async removeFollower(userId, followerId) {
        return UserModel.findByIdAndUpdate(userId, { $pull: { followers: followerId } }, { new: true });
    }
    async addArticle(userId, articleId) {
        return UserModel.findByIdAndUpdate(userId, { $addToSet: { articles: articleId } }, { new: true });
    }
}
//# sourceMappingURL=user.repository.js.map