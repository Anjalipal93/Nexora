import Product from "../models/productModel.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    // If DB empty, insert mock data
    if (products.length === 0) {
const mockProducts = [
  { name: "Laptop", price: 75000, image: "http://localhost:5000/images/laptop.jpeg" },
  { name: "Headphones", price: 2500, image: "http://localhost:5000/images/headphones.jpeg" },
  { name: "Smartphone", price: 30000, image: "http://localhost:5000/images/phones.jpeg" },
  { name: "Shoes", price: 1500, image: "http://localhost:5000/images/shoes.jpeg" },
  { name: "Watch", price: 5000, image: "http://localhost:5000/images/watch.jpeg" }
];


      await Product.insertMany(mockProducts);
      return res.json(mockProducts);
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
