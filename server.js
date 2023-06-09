import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import userRoute from "./routes/users.js";
import orderRoute from "./routes/orders.js";
import productRoute from "./routes/products.js";
import cors from "cors";
import paymentRoute from "./routes/Payment.js";
import morgan from "morgan";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
mongoose.set("strictQuery", false);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`server is listening in ${process.env.PORT}`);
});

app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/products", productRoute);
app.use("/api/payment", paymentRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
