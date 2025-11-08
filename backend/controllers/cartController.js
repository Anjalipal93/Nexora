import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

export const getCart = async (req, res) => {
  const items = await Cart.find();
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  res.json({ items, total });
};

export const addToCart = async (req, res) => {
  const { productId, qty } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ error: "Product not found" });

  const cartItem = new Cart({
    productId,
    name: product.name,
    qty,
    price: product.price
  });

  await cartItem.save();
  res.json(cartItem);
};

export const removeFromCart = async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.json({ message: "Item removed" });
};

export const checkout = async (req, res) => {
  const { cartItems } = req.body;
  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const receipt = {
    total,
    timestamp: new Date()
  };
  await Cart.deleteMany(); // clear cart after checkout
  res.json(receipt);
};
