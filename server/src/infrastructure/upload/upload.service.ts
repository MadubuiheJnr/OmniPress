import uploadClient from "./upload.client.js";
import crypto from "node:crypto";

const uploadAuthParams = () => {
  const token = crypto.randomBytes(32).toString("hex");

  return console.log(uploadClient.helper.getAuthenticationParameters());
};

export default uploadAuthParams;
