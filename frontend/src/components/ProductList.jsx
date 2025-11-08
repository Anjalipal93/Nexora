import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${API}/api/products`).then((res) => {
      setProducts(res.data);
    });
  }, []);

  const addToCart = async (id) => {
    await axios.post(`${API}/api/cart`, { productId: id, qty: 1 });
    alert("🛒 Added to cart successfully!");
  };

  return (
    <div className="page-container">
     {/* <nav className="navbar">
  <Link to="/" className="nav-link">Products</Link>
  <Link to="/cart" className="nav-link">Cart</Link>
</nav> */}


      <h1 className="page-title">✨ Explore Our Latest Products ✨</h1>

      <div className="product-grid">
        {products.map((p) => (
          <div className="product-card" key={p._id}>
            <div className="product-image-container">
              <img src={p.image} alt={p.name} />
            </div>
            <div className="product-info">
              <h3>{p.name}</h3>
              <p>₹{p.price}</p>
              <button onClick={() => addToCart(p._id)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
