import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI;

const DBconnect = async () => {

  try {
    await mongoose.connect(MONGO_URI!, {
      dbName: 'aaraz',
      bufferCommands: true
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};
export default DBconnect;