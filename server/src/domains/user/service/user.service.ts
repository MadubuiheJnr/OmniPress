import type { ClientSession, Types } from "mongoose";
import type { IUser } from "../types/user.types.js";
import type { UserRepository as IUserRepository } from "../repository/user.repository.js";
import { NotFoundError } from "shared/errors/http.error.js";

export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}
  async createUser(
    userData: Pick<IUser, "firstName" | "lastName" | "username" | "_id">,
    options?: { session?: ClientSession },
  ): Promise<Pick<IUser, "firstName" | "lastName">> {
    const { firstName, lastName, _id, username } = userData;
    const newUser = await this.userRepository.create(
      {
        _id,
        firstName,
        lastName,
        username,
        avatar: "",
        bio: "",
        followers: [],
        following: [],
        articles: [],
        isPrivate: false,
        isVerified: false,
      },
      { session: options?.session as ClientSession },
    );
    return {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    };
  }
  async getUserIdByUsername(username: string): Promise<Types.ObjectId | null> {
    const user = await this.userRepository.findByUsername(username);
    return user ? user._id : null;
  }
  async getUserProfileById(id: Types.ObjectId): Promise<IUser> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new NotFoundError("User not found");
    return user;
  }
}
