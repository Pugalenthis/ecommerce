import { Router } from "express";
import Razorpay from "razorpay";
import express from "express";

const router = express.Router();

router.post("/order", (req, res, next) => {
  try {
    var instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });

    var options = {
      amount: 50000, // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    instance.orders.create(options, function (err, order) {
      if (err) {
        return next(err);
      }
      res.status(200).json(order);
    });
  } catch (error) {
    console.log("error", error);
    next(error);
  }
});

router.post("/verify", (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

export default router;
