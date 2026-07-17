import { ConflictError, InternalServerError, } from "shared/errors/http.error.js";
import eventBus from "shared/event/event-bus.js";
import { AppError } from "shared/errors/app.error.js";
import mongoose from "mongoose";
export class RegisterUseCase {
    authService;
    userService;
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async execute(data) {
        const { firstName, lastName, username, email, password } = data;
        const emailExists = await this.authService.getUserIdByEmail(email);
        if (emailExists)
            throw new ConflictError("Email already in use", "Please use a different email address");
        const usernameExists = await this.userService.getUserIdByUsername(username);
        if (usernameExists)
            throw new ConflictError("Username is not available", "Please use a different username");
        const session = await mongoose.startSession();
        try {
            const auth = await session.withTransaction(async () => {
                const newAuth = await this.authService.createAuth({
                    email,
                    password,
                }, { session });
                const newUser = await this.userService.createUser({
                    _id: newAuth._id,
                    firstName,
                    lastName,
                    username,
                }, { session });
                return {
                    _id: newAuth._id,
                    email: newAuth.email,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    emailVerifyToken: newAuth.emailVerifyToken,
                };
            });
            if (!auth) {
                throw new InternalServerError("Registration failed. Please try again.");
            }
            eventBus.emit("auth.registered", {
                authId: auth._id,
                firstName: auth.firstName,
                email: auth.email,
                emailVerifyToken: auth.emailVerifyToken,
            });
            return {
                email: auth.email,
            };
        }
        catch (error) {
            console.log(error);
            if (error instanceof AppError)
                throw error;
            throw new InternalServerError("Registration failed. Please try again.");
        }
        finally {
            session.endSession();
        }
    }
}
//# sourceMappingURL=register.use-case.js.map