import express from "express";
import Product from "../models/productModel.js";
import { getProducts } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);

// 👇 Add this one-time reset route
router.get("/reset", async (req, res) => {
  await Product.deleteMany({});
  res.send("✅ Products deleted successfully! Now restart your backend to reload updated data.");
});

export default router;
