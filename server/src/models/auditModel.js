// // models/auditModel.js
// import mongoose from "mongoose";

// const auditSchema = new mongoose.Schema({
//   action: { type: String, required: true }, // e.g. "USER_DELETED"
//   performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // the admin
//   targetUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },   // the deleted user
//   details: { type: Object }, // store metadata like email, userName, etc.
//   timestamp: { type: Date, default: Date.now },
// });

// export const auditModel = mongoose.model("Audit", auditSchema);
