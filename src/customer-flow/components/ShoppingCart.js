import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { logo, arrow } from "../../assets/svgs/customerflow";
import { CartContext } from "../../contexts/CartContext";
import ShoppingCartItem from "./ShoppingCartItem";
import axiosWithAuth from "../../utils/axiosWithAuth";
import "../../styles/css/customer/shopping_cart.css";

const ShoppingCart = ({ history }) => {
  const { setCart, subtotal, cart, addToCount, subtractCount } = useContext(
    CartContext
  );
  const customer = localStorage.getItem("user_id");
  const submitOrder = () => {
    const date = new Date().toLocaleString().split(",")[0];
    const newDate = date.toString();
    axiosWithAuth()
      .post("/orders/submit", {
        subtotal: subtotal,
        user_id: customer,
        business_name: cart[0].business_name,
        date_of_order: newDate,
      })
      .then((res) => {
        history.push("/confirmation");

        setCart([]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="cart-page" data-testid="shopping-cart">
      <section className="left-cart-wrapper">
        <div className="mk-logo">
          <Link to="/">
            <img src={logo} alt="market avenue logo" />
          </Link>
        </div>
        <div className="back-arrow">
          <Link to="/customerHome/search">
            <img src={arrow} alt="backwards arrow" />
            back to products
          </Link>
        </div>
        <div className="left-content">
          {cart.length > 0 ? (
            <div className="left-inner-content">
              {cart.map((item) => (
                <ShoppingCartItem
                  item={item}
                  addToCount={addToCount}
                  subtractCount={subtractCount}
                />
              ))}
            </div>
          ) : (
            <div className="empty-cart">
              <h1>Your Shopping Cart is empty!</h1>
              <Link to="/customerHome/search">Start Shopping</Link>
            </div>
          )}
        </div>
      </section>
      <section className="right-cart-wrapper">
        <h1>Subtotal: ${subtotal.toFixed(2)} </h1>
        <p>Taxes(where applicable) added at checkout</p>
        <button className="checkout-btn" onClick={() => submitOrder()}>
          Order
        </button>
      </section>
    </div>
  );
};
export default ShoppingCart;

// cart -> count of items -> only unique items ->
