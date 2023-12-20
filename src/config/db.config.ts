import { config } from "dotenv";
import mongoose from "mongoose";

config(); // Load environment variables from .env file

const URI = process.env.MONGO_URL || "";


async function connectDB() {
  try {
    if (!URI) {
      throw new Error("MongoDB connection string is not defined.");
    }
    const connection = mongoose.connect(URI);
    console.log("Db connected");
    return connection;
  } catch (err) {
    console.error(`db connection failed`);
    console.error(err);
  }
}

export default connectDB;
