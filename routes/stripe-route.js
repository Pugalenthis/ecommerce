import express from "express";
import Stripe from "stripe";
const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_BACKEND_KEY);

router.post("/pay", (req, res, next) => {
  try {
    console.log("before customer creation", req.body);
    const customer = stripe.customers.create({
      email: req.body.email,
      source: req.body.token,
    });
    console.log("after customer creation");
    console.log("customer", customer.id);
  } catch (error) {
    console.log(error);
  }
});

export default router;
