export {};

declare global {
  namespace Express {
    interface Request {
      user?: IAuthUser;
      validatedQuery?: Record<string, string>;
    }
  }
}

interface IAuthUser {
  _id: string;
  email: string;
  sessionId: string;
}
