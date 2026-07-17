import { NotFoundError } from "shared/errors/http.error.js";
export class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(userData, options) {
        const { firstName, lastName, _id, username } = userData;
        const newUser = await this.userRepository.create({
            _id,
            firstName,
            lastName,
            username,
            avatar: "",
            bio: "",
            followers: [],
            following: [],
            articles: [],
            isPrivate: false,
            isVerified: false,
        }, { session: options?.session });
        return {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
        };
    }
    async getUserIdByUsername(username) {
        const user = await this.userRepository.findByUsername(username);
        return user ? user._id : null;
    }
    async getUserProfileById(id) {
        const user = await this.userRepository.findById(id);
        if (!user)
            throw new NotFoundError("User not found");
        return user;
    }
}
//# sourceMappingURL=user.service.js.map