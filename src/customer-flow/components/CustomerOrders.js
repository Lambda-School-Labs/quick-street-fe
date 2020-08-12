import React, { useState, useEffect } from "react";
import axiosWithAuth from "../../utils/axiosWithAuth";
import "../../styles/css/customer/customer_orders.css";

const CustomerOrders = ({ orders, setOrders, name }) => {
  console.log("is this the name?", name);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("/orders/me")
      .then((res) => {
        let newArr = res.data.map((item) => {
          let date = item.date_of_order.split("T")[0];
          return { ...item, date_of_order: date };
        });
        setOrderData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="orders-wrapper" data-testid="orders-wrapper">
      <h1 className="user-title">{name}'s Orders</h1>
      {orderData.length === 0 ? (
        <h1>You have no orders.</h1>
      ) : (
        orderData.map((item) => (
          <div className="order-wrapper">
            <div className="order-info">
              <div>
                <p>Date:</p>
                <h3>{item.date_of_order}</h3>
              </div>
              <div>
                <p>Order #:</p>
                <h3>{item.id}</h3>
              </div>
              <div>
                <p>Total Price:</p>
                <h3>${item.subtotal}</h3>
              </div>
              <div>
                <p>Vendor Name:</p>
                <h3>{item.business_name}</h3>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CustomerOrders;
