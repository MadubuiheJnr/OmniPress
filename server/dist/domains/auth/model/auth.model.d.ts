import mongoose from "mongoose";
import type { IAuthDocument } from "../types/auth.types.js";
declare const AuthModel: mongoose.Model<IAuthDocument, {}, {}, {}, mongoose.Document<unknown, {}, IAuthDocument, {}, {}> & IAuthDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default AuthModel;
//# sourceMappingURL=auth.model.d.ts.map