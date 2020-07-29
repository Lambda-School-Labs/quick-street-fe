import React, { useState, useContext } from "react";
import "../../styles/css/customer/shopping_slidein.css";
import {CartContext} from "../../contexts/CartContext"

const ShoppingSlidein = ({ handleSidebar }) => {
  const {cart, setCart} = useContext(CartContext);
  return (
    <div className="cart-drawer">
      <h1>This is your shopping cartSSS</h1>
      {cart.map(item => (
        <h4>{item}</h4>
      ))}
      <button onClick={handleSidebar}>Close</button>
    </div>
  );
};
export default ShoppingSlidein;
