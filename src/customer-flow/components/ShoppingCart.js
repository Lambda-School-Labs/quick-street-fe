import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { logo, arrow } from "../../assets/svgs/customerflow";
import { CartContext } from "../../contexts/CartContext";
import "../../styles/css/customer/shopping_cart.css";

const ShoppingCart = () => {
  const { cart, setCart, price, setPrice } = useContext(CartContext);
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
        <div className="left-content">
          <h1>Shopping Cart is empty</h1>
        </div>
      </section>
      <section className="right-cart-wrapper">
        <h1>Subtotal: ${price.toFixed(2)} </h1>
        <p>Taxes(where applicable) added at checkout</p>
        <button className="checkout-btn">Checkout</button>
      </section>
    </div>
  );
};
export default ShoppingCart;
