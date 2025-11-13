import ImageKit from "@imagekit/nodejs";

const imageKit = new ImageKit({
  publicKey: process.env["IMAGEKIT_PRIVATE_KEY"],
});

export default imageKit;
