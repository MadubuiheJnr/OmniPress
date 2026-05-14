import type { ClientSession, Types } from "mongoose";
import type { IUser } from "../types/user.types.js";
import userRepository from "../repository/user.repository.js";

export class UserService {
  async createUser(
    userData: Pick<IUser, "firstName" | "lastName" | "username" | "_id">,
    options?: { session?: ClientSession },
  ): Promise<Pick<IUser, "firstName" | "lastName">> {
    const { firstName, lastName, _id, username } = userData;
    const newUser = await userRepository.create(
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
    const user = await userRepository.findByUsername(username);
    return user ? user._id : null;
  }
  async getUserProfileById(id: Types.ObjectId): Promise<IUser | null> {
    return userRepository.findById(id);
  }
}
