import express from "express";
import Cart from "../models/cartModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // Fetch all cart items
    const cart = await Cart.find();

    // If the cart is empty
    if (!cart || cart.length === 0) {
      return res.status(400).json({
        message: "Your cart is empty. Please add items before checkout.",
      });
    }

    // Calculate total
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    // Create mock order receipt
    const receipt = {
      orderId: Math.floor(Math.random() * 1000000),
      name: req.body.name || "Guest",
      email: req.body.email || "Not provided",
      total,
      timestamp: new Date().toLocaleString(),
    };

    // Clear the cart
    await Cart.deleteMany({});

    // Return the receipt
    res.status(200).json(receipt);
  } catch (error) {
    console.error("❌ Checkout Error:", error);
    res.status(500).json({
      message: "Checkout failed.",
      error: error.message,
    });
  }
});

export default router;
