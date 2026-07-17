import AuthModel from "../model/auth.model.js";
export class AuthRepository {
    async findByEmail(email) {
        return AuthModel.findOne({ email });
    }
    async findById(id) {
        return AuthModel.findById(id);
    }
    async create(authData, options) {
        const auth = new AuthModel(authData);
        return auth.save({ session: options?.session });
    }
    async updateById(id, updateData) {
        return AuthModel.findByIdAndUpdate(id, updateData, { new: true });
    }
    async findByVerifyToken(token) {
        return AuthModel.findOne({
            emailVerifyToken: token,
            emailVerifyTokenExpiry: { $gt: new Date() },
        });
    }
    async clearVerifyToken(id) {
        return AuthModel.findByIdAndUpdate(id, {
            $unset: { emailVerifyToken: "", emailVerifyTokenExpiry: "" },
            $set: { isEmailVerified: true },
        }, { new: true });
    }
    async findByResetToken(token) {
        return AuthModel.findOne({
            passwordResetToken: token,
            passwordResetTokenExpiry: { $gt: new Date() },
        });
    }
    async clearResetToken(id) {
        return AuthModel.findByIdAndUpdate(id, { $unset: { passwordResetToken: "", passwordResetTokenExpiry: "" } }, { new: true });
    }
    async addSession(id, session) {
        return AuthModel.findByIdAndUpdate(id, {
            $push: {
                loginSessions: {
                    $each: [session],
                    $slice: 5, // keep only the 5 most recent sessions (positive keeps first N when inserting at position 0)
                    $position: 0, // add to the front of the array
                },
            },
        }, { new: true });
    }
    async findSessionBySessionId(sessionId) {
        return AuthModel.findOne({ "loginSessions.sessionId": sessionId }, { "loginSessions.$": 1, email: 1 });
    }
    async getSessions(id) {
        const auth = await AuthModel.findById(id).select("loginSessions");
        return auth?.loginSessions ?? [];
    }
    async updateSessionToken(id, sessionId, tokenHash, expiresAt, lastActiveAt) {
        return AuthModel.findOneAndUpdate({ _id: id, "loginSessions.sessionId": sessionId }, {
            $set: {
                "loginSessions.$.tokenHash": tokenHash,
                "loginSessions.$.expiresAt": expiresAt,
                "loginSessions.$.lastActiveAt": lastActiveAt,
            },
        }, { new: true });
    }
    async removeSession(id, sessionId) {
        return AuthModel.findByIdAndUpdate(id, { $pull: { loginSessions: { sessionId } } }, { new: true });
    }
    async removeAllSessions(id) {
        return AuthModel.findByIdAndUpdate(id, { $set: { loginSessions: [] } }, { new: true });
    }
    async deleteById(id) {
        return AuthModel.findByIdAndDelete(id);
    }
}
//# sourceMappingURL=auth.repository.js.map