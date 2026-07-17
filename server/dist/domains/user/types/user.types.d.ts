import type { Types, Document, ClientSession } from "mongoose";
export interface IUser {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    username: string;
    avatar: string;
    bio: string;
    followers: Types.ObjectId[];
    following: Types.ObjectId[];
    articles: Types.ObjectId[];
    isPrivate: boolean;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface IUserDocument extends Omit<IUser, "_id">, Document {
}
export interface IUserService {
    createUser(userData: Pick<IUser, "firstName" | "lastName" | "username" | "_id">, options?: {
        session?: ClientSession;
    }): Promise<Pick<IUser, "firstName" | "lastName">>;
    getUserIdByUsername(username: string): Promise<Types.ObjectId | null>;
    getUserProfileById(id: Types.ObjectId): Promise<IUser | null>;
}
//# sourceMappingURL=user.types.d.ts.map