import mongoose from "mongoose";

const connectedDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Data base connected");
    });
    await mongoose.connect(`${process.env.MONGODB_URI}/OmniPress`);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectedDB;
