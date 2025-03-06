import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable inside .env.local");
}
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

const DBconnect = async () => {

  try {
    await mongoose.connect(MONGO_URI!, {
      dbName: 'aaraz',
      bufferCommands: true
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error)
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });
    
  }
};
export default DBconnect;