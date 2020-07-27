import React, { useState, useEffect } from "react";
import axiosWithAuth from "../../utils/axiosWithAuth";
import "../../styles/css/customer/customer_orders.css";

const CustomerOrders = ({ orders, setOrders, name }) => {
  // const [customer, setCustomer] = useState({
  //     customer_name: ""
  // })
  console.log("is this the name?", name);
  const [orderData, setOrderData] = useState([]);

  // useEffect(() => {
  //     axiosWithAuth()
  //       .get("/customers/me")
  //       .then((res) => {
  //         console.log("res from customer update", res.data);
  //         setCustomer(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }, []);

  useEffect(() => {
    axiosWithAuth()
      .get("/orders/me")
      .then((res) => {
        console.log("res from customer orders", res);
        for (let i=0; i<res.data.length; i++){
          let date = res.data[i].date_of_order.split("T")[0];
          console.log("date from order", date);
          // setOrderData({...res, data[i].date_of_order: date})
        }
        // const date = item.date_of_order.split("T")[0];

        setOrderData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //   function editField() {
  //     setEditing(!editing);
  //   }

  return (
    <div className="orders-wrapper">
      <h1 className="user-title">{name}'s Profile</h1>
      {orderData.length === 0 ? (
        <h1>You have no orders.</h1>
      ) : (
        orderData.map((item) => (
          <div className="order-wrapper">
            <div className="order-info">
              <p className="order-name">Order:</p>
              {/* <h3>{item.id}</h3> */}

              <p>Product Name:</p>
              <h3>{item.name}</h3>
              <p>Total Price:</p>
              <h3>{item.total_price}</h3>
              <p>Date:</p>
              <h3>{item.date_of_order}</h3>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CustomerOrders;
