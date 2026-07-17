import type { ClientSession, Types } from "mongoose";
import type { IUser } from "../types/user.types.js";
import type { UserRepository as IUserRepository } from "../repository/user.repository.js";
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    createUser(userData: Pick<IUser, "firstName" | "lastName" | "username" | "_id">, options?: {
        session?: ClientSession;
    }): Promise<Pick<IUser, "firstName" | "lastName">>;
    getUserIdByUsername(username: string): Promise<Types.ObjectId | null>;
    getUserProfileById(id: Types.ObjectId): Promise<IUser>;
}
//# sourceMappingURL=user.service.d.ts.map