import express from "express";
import Order from "../models/Order.js";
const router = express.Router();
import {
  verifyToken,
  verifyUser,
  verifyAdmin,
} from "../middlewares/authMiddleware.js";

router.post("/:id", verifyToken, verifyUser, async (req, res, next) => {
  try {
    const order = new Order({
      user: req.user.id,
      ...req.body,
    });
    const savedOrder = await order.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

router.get("/:order_id", async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params.order_id });
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
});

router.get("/user/:id", verifyToken, verifyUser, async (req, res, next) => {
  console.log("entered into get order by userid", req.params);
  console.log("orders in", req.params.id);
  try {
    const orders = await Order.find({ user: req.user.id });
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:order_id/:id",
  verifyToken,
  verifyUser,
  async (req, res, next) => {
    console.log("req.body in put", req.body);
    try {
      // const product = await Product.findOne({ _id: req.params.post_id });
      const updatedOrder = await Order.findOneAndUpdate(
        { razporpayOrderId: req.params.order_id },
        {
          $set: {
            isPaid: req.body.isPaid,
            paidAt: req.body.paidAt,
            "paymentResult.razorpay_payment_id": req.body.razorpay_payment_id,
            "paymentResult.razorpay_signature": req.body.razorpay_signature,
          },
        },
        { new: true }
      );

      console.log("updated order in routes", updatedOrder);
      res.status(200).json(updatedOrder);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
