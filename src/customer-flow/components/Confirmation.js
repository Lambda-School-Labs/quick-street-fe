import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logo, arrow } from "../../assets/svgs/customerflow";
import { CartContext } from "../../contexts/CartContext";
import ShoppingCartItem from "./ShoppingCartItem";
import axiosWithAuth from "../../utils/axiosWithAuth";
import "../../styles/css/customer/shopping_cart.css";

const Confirmation = ({ orders, setOrders }) => {

  console.log("is this the name?");
  const [orderData, setOrderData] = useState(
  {"business_name": "",
  "date_of_order": "",
  "id": "",
  "subtotal": "",
  "user_id": ""});

  useEffect(() => {
    axiosWithAuth()
      .get("/orders/me")
      .then((res) => {
        console.log("res from customer orders", res);
        let newArr = res.data.map((item) => {
          let date = item.date_of_order.split("T")[0];
          return { ...item, date_of_order: date };
        });
        console.log("new array", newArr);
        console.log("This is res.data-1", res.data[res.data.length-1]);
        setOrderData(res.data[res.data.length-1]);
      })
      .catch((err) => console.log(err));
  }, []);

  // console.log(orderData[-1]);

  return (
    <div>
      <div className="back-arrow">
          <Link to="/customerHome/search">
            <img src={arrow} alt="backwards arrow" />
            Back to Search
          </Link>
        </div>
      <h1 className="user-title">Order Confirmation</h1>
      (
          <div className="order-wrapper">
            <div className="order-info">
              <div><p>Date:</p>
              <h3>{orderData.date_of_order}</h3></div>
              <div><p >Order #:</p>
              <h3>{orderData.id}</h3></div>
              <div><p>Total Price:</p>
              <h3>${orderData.subtotal}</h3></div>
              <div><p>Vendor Name:</p>
              <h3>{orderData.business_name}</h3></div>
            </div>
          </div>

      )}
    </div>
  );
};
export default Confirmation;

// cart -> count of items -> only unique items ->
