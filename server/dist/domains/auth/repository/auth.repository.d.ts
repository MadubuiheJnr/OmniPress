import type mongoose from "mongoose";
import type { IAuth, ILoginSession } from "../types/auth.types.js";
import type { ClientSession } from "mongoose";
export declare class AuthRepository {
    findByEmail(email: string): Promise<(mongoose.Document<unknown, {}, import("../types/auth.types.js").IAuthDocument, {}, {}> & import("../types/auth.types.js").IAuthDocument & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    findById(id: mongoose.Types.ObjectId): Promise<(mongoose.Document<unknown, {}, import("../types/auth.types.js").IAuthDocument, {}, {}> & import("../types/auth.types.js").IAuthDocument & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    create(authData: Omit<IAuth, "_id" | "createdAt" | "updatedAt">, options?: {
        session?: ClientSession;
    }): Promise<mongoose.Document<unknown, {}, import("../types/auth.types.js").IAuthDocument, {}, {}> & import("../types/auth.types.js").IAuthDocument & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateById(id: mongoose.Types.ObjectId, updateData: Partial<Omit<IAuth, "_id" | "createdAt" | "updatedAt">>): Promise<(mongoose.Document<unknown, {}, import("../types/auth.types.js").IAuthDocument, {}, {}> & import("../types/auth.types.js").IAuthDocument & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    findByVerifyToken(token: string): Promise<(mongoose.Document<unknown, {}, import("../types/auth.types.js").IAuthDocument, {}, {}> & import("../types/auth.types.js").IAuthDocument & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    clearVerifyToken(id: mongoose.Types.ObjectId): Promise<(mongoose.Document<unknown, {}, import("../types/auth.types.js").IAuthDocument, {}, {}> & import("../types/auth.types.js").IAuthDocument & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    findByResetToken(token: string): Promise<(mongoose.Document<unknown, {}, import("../types/auth.types.js").IAuthDocument, {}, {}> & import("../types/auth.types.js").IAuthDocument & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    clearResetToken(id: mongoose.Types.ObjectId): Promise<(mongoose.Document<unknown, {}, import("../types/auth.types.js").IAuthDocument, {}, {}> & import("../types/auth.types.js").IAuthDocument & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    addSession(id: mongoose.Types.ObjectId, session: ILoginSession): Promise<(mongoose.Document<unknown, {}, import("../types/auth.types.js").IAuthDocument, {}, {}> & import("../types/auth.types.js").IAuthDocument & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    findSessionBySessionId(sessionId: string): Promise<(mongoose.Document<unknown, {}, import("../types/auth.types.js").IAuthDocument, {}, {}> & import("../types/auth.types.js").IAuthDocument & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    getSessions(id: mongoose.Types.ObjectId): Promise<ILoginSession[]>;
    updateSessionToken(id: mongoose.Types.ObjectId, sessionId: string, tokenHash: string, expiresAt: Date, lastActiveAt: Date): Promise<(mongoose.Document<unknown, {}, import("../types/auth.types.js").IAuthDocument, {}, {}> & import("../types/auth.types.js").IAuthDocument & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    removeSession(id: mongoose.Types.ObjectId, sessionId: string): Promise<(mongoose.Document<unknown, {}, import("../types/auth.types.js").IAuthDocument, {}, {}> & import("../types/auth.types.js").IAuthDocument & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    removeAllSessions(id: mongoose.Types.ObjectId): Promise<(mongoose.Document<unknown, {}, import("../types/auth.types.js").IAuthDocument, {}, {}> & import("../types/auth.types.js").IAuthDocument & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    deleteById(id: mongoose.Types.ObjectId): Promise<(mongoose.Document<unknown, {}, import("../types/auth.types.js").IAuthDocument, {}, {}> & import("../types/auth.types.js").IAuthDocument & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
//# sourceMappingURL=auth.repository.d.ts.map