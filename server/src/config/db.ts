import mongoose from "mongoose";
import { env } from "./env.js";

if (env.NODE_ENV === "development") {
  const { default: dns } = await import("node:dns");
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
}

const connectDB = async (): Promise<void> => {
  const options = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  };

  const conn = await mongoose.connect(env.MONGODB_URI, options);
  console.log(`✅ MongoDB connected: ${conn.connection.host}`);

  mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ MongoDB disconnected");
  });
};

export default connectDB;
