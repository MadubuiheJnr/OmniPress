export interface AuthUser {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatar: string;
}

export interface RegisterSuccessResponse {
  success: true;
  statusCode: number;
  message: string;
  data: { email: string };
}
