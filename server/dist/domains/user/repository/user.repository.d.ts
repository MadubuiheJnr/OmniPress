import type { Types, ClientSession } from "mongoose";
import type { IUser } from "../types/user.types.js";
export declare class UserRepository {
    findById(id: Types.ObjectId): Promise<(import("mongoose").Document<unknown, {}, import("../types/user.types.js").IUserDocument, {}, {}> & import("../types/user.types.js").IUserDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    findByIdSelect(id: Types.ObjectId, fields: string): Promise<(import("mongoose").Document<unknown, {}, import("../types/user.types.js").IUserDocument, {}, {}> & import("../types/user.types.js").IUserDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    findByUsername(username: string): Promise<(import("mongoose").Document<unknown, {}, import("../types/user.types.js").IUserDocument, {}, {}> & import("../types/user.types.js").IUserDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    create(userData: Omit<IUser, "createdAt" | "updatedAt">, options?: {
        session?: ClientSession;
    }): Promise<import("mongoose").Document<unknown, {}, import("../types/user.types.js").IUserDocument, {}, {}> & import("../types/user.types.js").IUserDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateById(id: Types.ObjectId, updateData: Partial<Omit<IUser, "_id" | "createdAt" | "updatedAt">>): Promise<(import("mongoose").Document<unknown, {}, import("../types/user.types.js").IUserDocument, {}, {}> & import("../types/user.types.js").IUserDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    deleteById(id: Types.ObjectId): Promise<(import("mongoose").Document<unknown, {}, import("../types/user.types.js").IUserDocument, {}, {}> & import("../types/user.types.js").IUserDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    addFollower(userId: Types.ObjectId, followerId: Types.ObjectId): Promise<(import("mongoose").Document<unknown, {}, import("../types/user.types.js").IUserDocument, {}, {}> & import("../types/user.types.js").IUserDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    removeFollower(userId: Types.ObjectId, followerId: Types.ObjectId): Promise<(import("mongoose").Document<unknown, {}, import("../types/user.types.js").IUserDocument, {}, {}> & import("../types/user.types.js").IUserDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    addArticle(userId: Types.ObjectId, articleId: Types.ObjectId): Promise<(import("mongoose").Document<unknown, {}, import("../types/user.types.js").IUserDocument, {}, {}> & import("../types/user.types.js").IUserDocument & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
//# sourceMappingURL=user.repository.d.ts.map