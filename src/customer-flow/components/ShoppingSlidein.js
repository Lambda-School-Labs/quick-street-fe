import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/css/customer/shopping_slidein.css";
import { CartContext } from "../../contexts/CartContext";

const ShoppingSlidein = ({ handleSidebar }) => {
  const { cart, setCart, price, setPrice } = useContext(CartContext);

  useEffect(() => {
    if (cart.length > 0) {
      setPrice(
        cart.reduce((acc, obj) => {
          let newPrice = Number(obj.price);
          let total = acc + newPrice;
          return total;
        }, 0)
      );
    }
  }, [cart]);
  console.log("price reduce fn", price);
  return (
    <div className="cart-content">
      <h1>Your Cart</h1>
      <hr />
      <p>Items: {cart.length}</p>
      {cart.map((item) => (
        <p>{item.name}</p>
      ))}
      <p>Total:${price.toFixed(2)}</p>

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
