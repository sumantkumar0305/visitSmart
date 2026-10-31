
import dns from "node:dns";
import mongoose from "mongoose";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOURL, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB connected successfully!");

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected.");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB reconnected.");
    });

    mongoose.connection.on("error", (error) => {
      console.error("MongoDB error:", error.message);
    });

  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
};
