import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("mongoose is connected");
  } catch (error) {
    console.log("mongoose dissconnected", error.message);
  }
};
