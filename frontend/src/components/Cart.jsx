import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Cart.css";


const API = import.meta.env.VITE_API_URL;

function Cart() {
  const [cart, setCart] = useState({ items: [], total: 0 });

  const fetchCart = async () => {
    const res = await axios.get(`${API}/api/cart`);
    setCart(res.data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (id) => {
    await axios.delete(`${API}/api/cart/${id}`);
    fetchCart();
  };

  return (
    <div className="cart-page">
     {/* <nav className="navbar"> */}
  {/* <Link to="/" className="nav-link">Products</Link>
  <Link to="/cart" className="nav-link">Cart</Link>
</nav> */}


      <div className="cart-container">
        <h2 className="cart-title">🛒 Your Shopping Cart</h2>

        {cart.items.length === 0 ? (
          <p className="empty-cart">Your cart is empty 🛍️</p>
        ) : (
          <>
           <div className="cart-items">
  {cart.items.map((item) => (
    <div className="cart-item" key={item._id}>
      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <p>Quantity: {item.qty}</p>
        <p>Price: ₹{item.price}</p>
        <p className="item-total">Total: ₹{item.price * item.qty}</p>
      </div>
      <button
        className="remove-btn"
        onClick={() => removeItem(item._id)}
      >
        Remove
      </button>
    </div>
  ))}
</div>


            <div className="cart-summary">
              <h3>
                💰 Total Amount: <span>₹{cart.total}</span>
              </h3>
              <Link to="/checkout">
                <button className="checkout-btn">Proceed to Checkout</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
