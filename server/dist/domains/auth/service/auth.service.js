import { hashPassword, comparePassword } from "shared/utils/hash.util.js";
import crypto from "node:crypto";
import { v7 as uuidv7 } from "uuid";
import { BadRequestError, UnauthorizedError, } from "shared/errors/http.error.js";
export class AuthService {
    authRepository;
    tokenService;
    constructor(authRepository, tokenService) {
        this.authRepository = authRepository;
        this.tokenService = tokenService;
    }
    async createAuth(authData, options) {
        const { email, password } = authData;
        const hashedPassword = await hashPassword(password);
        const verifyToken = crypto.randomBytes(32).toString("hex");
        const hashedEmailVerifyToken = crypto
            .createHash("sha256")
            .update(verifyToken)
            .digest("hex");
        const verificationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const newAuth = await this.authRepository.create({
            email,
            password: hashedPassword,
            isEmailVerified: false,
            emailVerifyToken: hashedEmailVerifyToken,
            emailVerifyTokenExpiry: verificationTokenExpiresAt,
            loginSessions: [],
        }, { session: options?.session });
        return {
            _id: newAuth._id,
            email: newAuth.email,
            emailVerifyToken: verifyToken,
        };
    }
    async getUserIdByEmail(email) {
        const auth = await this.authRepository.findByEmail(email);
        return auth ? auth._id : null;
    }
    async login(id, password, sessionInfo) {
        const auth = await this.authRepository.findById(id);
        if (!auth) {
            throw new BadRequestError("Invalid credentials", "Please check your credentials and try again");
        }
        const passwordMatch = await comparePassword(password, auth.password);
        if (!passwordMatch) {
            throw new BadRequestError("Invalid credentials", "Please check your credentials and try again");
        }
        const emailVerified = auth.isEmailVerified;
        if (!emailVerified) {
            throw new BadRequestError("Email is not verified", "Please verify your email address and login again");
        }
        const sessionId = uuidv7();
        const { accessToken, refreshToken, hashedRefreshToken } = await this.tokenService.issueTokens({
            authId: auth._id.toString(),
            sessionId,
            email: auth.email,
        });
        await this.authRepository.addSession(auth._id, {
            sessionId,
            tokenHash: hashedRefreshToken,
            ip: sessionInfo?.ip ?? "unknown",
            location: "unknown",
            device: sessionInfo?.device ?? "unknown",
            browser: sessionInfo?.browser ?? "unknown",
            userAgent: sessionInfo?.userAgent ?? "unknown",
            lastActiveAt: new Date(),
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        });
        return {
            _id: auth._id,
            email: auth.email,
            createdAt: auth.createdAt,
            accessToken,
            refreshToken,
        };
    }
    async verifyEmail(query) {
        const hashedToken = crypto
            .createHash("sha256")
            .update(query.token)
            .digest("hex");
        const auth = await this.authRepository.findByVerifyToken(hashedToken);
        if (!auth) {
            throw new BadRequestError("Unable to verify email", "This link may be invalid or has expired. Please request a new one or try again.");
        }
        await this.authRepository.clearVerifyToken(auth._id);
        return true;
    }
    async refresh(incomingToken) {
        const dotIndex = incomingToken.indexOf(".");
        const sessionId = incomingToken.substring(0, dotIndex);
        const token = incomingToken.substring(dotIndex + 1);
        const hashedToken = crypto
            .createHash("sha256")
            .update(incomingToken)
            .digest("hex");
        if (!sessionId || !token) {
            throw new UnauthorizedError("You're not logged in", "Your request cannot be processed. Please login again to continue.");
        }
        const session = await this.authRepository.findSessionBySessionId(sessionId);
        if (!session) {
            throw new UnauthorizedError("Session expired", "Your request cannot be processed. Please login again to continue.");
        }
        const sessionData = session.loginSessions[0];
        if (!sessionData) {
            throw new UnauthorizedError("Session expired", "Your request cannot be processed. Please login again to continue.");
        }
        if (new Date() > sessionData.expiresAt) {
            await this.authRepository.removeSession(session._id, sessionId);
            throw new UnauthorizedError("Session expired", "Your request cannot be processed. Please login again to continue.");
        }
        if (sessionData.tokenHash !== hashedToken) {
            await this.authRepository.removeSession(session._id, sessionId);
            throw new UnauthorizedError("Your session has been terminated for security reasons", "Login again to continue. If this happens repeatedly, please contact support");
        }
        const { accessToken, refreshToken, hashedRefreshToken } = await this.tokenService.issueTokens({
            authId: session._id.toString(),
            sessionId,
            email: session.email,
        });
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
        const lastActiveAt = new Date();
        await this.authRepository.updateSessionToken(session._id, sessionId, hashedRefreshToken, expiresAt, lastActiveAt);
        return {
            accessToken,
            refreshToken,
            authId: session._id,
            email: session.email,
        };
    }
}
//# sourceMappingURL=auth.service.js.map