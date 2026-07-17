import ImageKit from "@imagekit/nodejs";
import { env } from "config/env.js";
const uploadClient = new ImageKit({
    privateKey: env.IMAGEKIT_PRIVATE_KEY,
});
export default uploadClient;
//# sourceMappingURL=upload.client.js.map