import mongoose from "mongoose";
export const connectDB = () => {
  try {
    const con = mongoose.connect(process.env.MONGO_URL);
    con && console.log("db connected");
  } catch (error) {}
};
