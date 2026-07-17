export {};
// export interface IAuthService {
//   createAuth(
//     authData: Pick<IAuth, "email" | "password">,
//     options?: { session?: mongoose.ClientSession },
//   ): Promise<Pick<IAuth, "_id" | "email" | "emailVerifyToken">>;
//   getUserIdByEmail(email: string): Promise<mongoose.Types.ObjectId | null>;
//   login(
//     id: mongoose.Types.ObjectId,
//     password: string,
//     loginSession?: Omit<
//       ILoginSession,
//       | "sessionId"
//       | "isCurrent"
//       | "lastActiveAt"
//       | "createdAt"
//       | "location"
//       | "tokenHash"
//     >,
//   ): Promise<{
//     _id: mongoose.Types.ObjectId;
//     email: string;
//     createdAt: Date;
//     accessToken: string;
//     refreshToken: string;
//   }>;
//   verifyEmail(query: VerifyEmailDto): Promise<void>;
// }
//# sourceMappingURL=auth.types.js.map