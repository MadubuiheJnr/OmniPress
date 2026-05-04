export {};

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

interface AuthUser {
  userId: string;
  email: string;
}
