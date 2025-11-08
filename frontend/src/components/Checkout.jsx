import React, { useState } from "react";
import axios from "axios";
import "./Checkout.css"; // 👈 new CSS file we'll add

const API = import.meta.env.VITE_API_URL;

function Checkout() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await axios.post(`${API}/api/checkout`, form);
    setOrder(res.data);
  } catch (err) {
    console.error(err);
    alert("❌ Something went wrong while placing the order.");
  }

  setLoading(false);
};


  const handleReset = () => {
    setForm({ name: "", email: "" });
    setOrderPlaced(false);
    setReceipt(null);
  };

  return (
    <div className="checkout-page">
      <div className="checkout-card">
        <h2>🧾 Checkout</h2>

        {!orderPlaced ? (
          <>
            <form onSubmit={handleSubmit} className="checkout-form">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? "Processing..." : "Place Order"}
              </button>
            </form>
          </>
        ) : (
          <div className="success-card">
            <h3>🎉 Order Placed Successfully!</h3>
            <p>Thank you, {form.name}! Your receipt:</p>
            <div className="receipt-box">
              <p><strong>Order ID:</strong> #{receipt?._id || "12345"}</p>
              <p><strong>Total:</strong> ₹{receipt?.total || "80000"}</p>
              <p><strong>Date:</strong> {receipt?.timestamp || new Date().toLocaleString()}</p>
            </div>
            <button onClick={handleReset}>🛍️ Continue Shopping</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
