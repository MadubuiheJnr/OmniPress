import mongoose from "mongoose";
import type { IUserDocument } from "../types/user.types.js";
declare const UserModel: mongoose.Model<IUserDocument, {}, {}, {}, mongoose.Document<unknown, {}, IUserDocument, {}, {}> & IUserDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default UserModel;
//# sourceMappingURL=user.model.d.ts.map