import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("db connected");
    return mongoose.connection;
  } catch (error) {
    console.error("db connection failed:", error.message);
    throw error;
  }
};

export default connectDB;