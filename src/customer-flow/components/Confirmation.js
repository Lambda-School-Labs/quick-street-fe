import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logo, arrow } from "../../assets/svgs/customerflow";
import { CartContext } from "../../contexts/CartContext";
import ShoppingCartItem from "./ShoppingCartItem";
import axiosWithAuth from "../../utils/axiosWithAuth";
import "../../styles/css/customer/shopping_cart.css";
import "../../styles/css/customer/confirmation.css";

const Confirmation = ({ orders, setOrders }) => {
  const [orderData, setOrderData] = useState({
    business_name: "",
    date_of_order: "",
    id: "",
    subtotal: "",
    user_id: "",
  });

  useEffect(() => {
    axiosWithAuth()
      .get("/orders/me")
      .then((res) => {
        let newArr = res.data.map((item) => {
          let date = item.date_of_order.split("T")[0];
          return { ...item, date_of_order: date };
        });
        setOrderData(res.data[res.data.length - 1]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="cart-page">
        <div className="mk-logo">
          <Link to="/">
            <img src={logo} alt="market avenue logo" />
          </Link>
        </div>

        <h1 className="conf-user-title">Order Confirmation</h1>

        <div className="conf-order-wrapper" data-testid="confirmation-wrapper">
          <div className="conf-order-info">
            <div>
              <p>Date:</p>
              <h3>{orderData.date_of_order}</h3>
            </div>
            <div>
              <p>Order #:</p>
              <h3>{orderData.id}</h3>
            </div>
            <div>
              <p>Total Price:</p>
              <h3>${orderData.subtotal}</h3>
            </div>
            <div>
              <p>Vendor Name:</p>
              <h3>{orderData.business_name}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="conf-box">
        <button className="conf-button">
          <Link to="/customerHome/search" className="conf-link">
            {" "}
            Home{" "}
          </Link>
        </button>
      </div>
    </div>
  );
};
export default Confirmation;
