import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/css/customer/shopping_slidein.css";
import { CartContext } from "../../contexts/CartContext";

const ShoppingSlidein = ({ handleSidebar }) => {
  const { cart, setCart, subtotal, setSubtotal } = useContext(CartContext);
  console.log("cart on the shopping slide in", cart);
  return (
    <div className="cart-content" data-testid="cart-content">
      <h1>Your Cart</h1>
      <hr />
      <p>Items: {cart.length}</p>
      {cart.map((item) => (
        <p>{item.name}</p>
      ))}
      <p>Total:${subtotal.toFixed(2)}</p>

      <button className="keep-btn" onClick={handleSidebar}>
        Keep Shopping
      </button>
      <button className="checkout-btn">
        <Link to="/shopping-cart">Checkout</Link>
      </button>
    </div>
  );
};
export default ShoppingSlidein;
