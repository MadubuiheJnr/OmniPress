export type UserType = {
  _id: string;
  userName: string;
  email: string;
  role: "admin" | "user";
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  _v: string;
};
