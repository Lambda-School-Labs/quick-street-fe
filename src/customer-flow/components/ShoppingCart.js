import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logo, arrow } from "../../assets/svgs/customerflow";
import { CartContext } from "../../contexts/CartContext";
import ShoppingCartItem from "./ShoppingCartItem";
import axiosWithAuth from '../../utils/axiosWithAuth';
import "../../styles/css/customer/shopping_cart.css";

const ShoppingCart = () => {
  const { subtotal, cart, addToCount, subtractCount } = useContext(CartContext);
  const customer = localStorage.getItem("user_id")

  
  const submitOrder = () => {
    const date = Date(Date.now());
    const newDate = date.toString();
    console.log("data", subtotal, customer, cart[0].business_name, date)
    axiosWithAuth()
    .post("/orders/submit", {"subtotal":subtotal, "user_id":customer, "business_name":cart[0].business_name, "date_of_order":newDate})
    .then(res => {
      console.log("data", subtotal, customer, cart[0].business_name)
      console.log("order submitted")
    })
    .catch(error => {
      console.log(error)
    })
  }

  console.log("IN THE CART", cart)
  console.log("TOKEN", localStorage.getItem("user_id"))
  // console.log("BUSINESS", cart[0].business_name)
  return (
    <div className="cart-page">
      <section className="left-cart-wrapper">
        <div className="mk-logo">
          <Link to="/">
            <img src={logo} alt="market avenue logo" />
          </Link>
        </div>
        <div className="back-arrow">
          <Link to="/customerHome">
            <img src={arrow} alt="backwards arrow" />
            back to products
          </Link>
        </div>
        <div className='subtotal'>SUBTOTAL: {subtotal}</div>
        <div className="left-content">
          {cart.length > 0 ? (
            cart.map((item) => (
              <ShoppingCartItem
                item={item}
                addToCount={addToCount}
                subtractCount={subtractCount}
              />
            ))
          ) : (
            <h1>Shopping Cart is empty</h1>
          )}
        </div>
      </section>
      <section className="right-cart-wrapper">
        <h1>Subtotal: ${subtotal.toFixed(2)} </h1>
        <p>Taxes(where applicable) added at checkout</p>
        <button className="checkout-btn" onClick={() => submitOrder()}>Order IT</button>
      </section>
    </div>
  );
};
export default ShoppingCart;

// cart -> count of items -> only unique items ->
