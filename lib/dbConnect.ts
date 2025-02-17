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
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });
    
  }
};
export default DBconnect;