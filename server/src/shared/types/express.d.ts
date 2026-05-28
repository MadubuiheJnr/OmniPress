export {};

declare global {
  namespace Express {
    interface Request {
      user?: IAuthUser;
    }
  }
}

interface IAuthUser {
  _id: string;
  email: string;
  sessionId: string;
}
