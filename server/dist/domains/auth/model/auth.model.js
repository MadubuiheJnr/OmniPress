import mongoose from "mongoose";
const LoginSessionSchema = new mongoose.Schema({
    sessionId: { type: String, required: true },
    tokenHash: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    ip: { type: String, required: true },
    location: { type: String, required: true },
    device: { type: String, required: true },
    browser: { type: String, required: true },
    userAgent: { type: String, required: true },
    lastActiveAt: { type: Date, default: Date.now },
}, { _id: false, timestamps: { createdAt: true, updatedAt: false } });
const AuthSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    emailVerifyToken: {
        type: String,
    },
    emailVerifyTokenExpiry: {
        type: Date,
    },
    passwordChangedAt: {
        type: Date,
    },
    passwordResetToken: {
        type: String,
    },
    passwordResetTokenExpiry: {
        type: Date,
    },
    loginSessions: {
        type: [LoginSessionSchema],
        default: [],
    },
}, { timestamps: true });
AuthSchema.index({ emailVerifyToken: 1 }, { sparse: true });
AuthSchema.index({ passwordResetToken: 1 }, { sparse: true });
const AuthModel = mongoose.model("Auth", AuthSchema);
export default AuthModel;
//# sourceMappingURL=auth.model.js.map