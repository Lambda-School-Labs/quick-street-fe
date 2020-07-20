import React, { useState, useEffect } from "react";
import axiosWithAuth from "../../utils/axiosWithAuth";
import "../../styles/css/customer/customer_profile.css"; 

const CustomerOrders = ({ orders, setOrders }) => {
    const [customer, setCustomer] = useState({
        customer_name: ""
    })
  const [ orderData, setOrderData] = useState({
    product_name: "",
    units: "",
    price: "",
    total_price: "",
    order_date: ""
  });
//   const [editing, setEditing] = useState(false);

//   const changeHandler = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();
//     console.log("formData", formData);
//     axiosWithAuth()
//       .put("/customers/profile/update", formData)
//       .then((res) => {
//         console.log("res from customer update", res);
//         editField();
//         setName(res.data.customer_name);
//       })
//       .catch((err) => console.log(err));
//   };

useEffect(() => {
    axiosWithAuth()
      .get("/customers/me")
      .then((res) => {
        console.log("res from customer update", res.data);
        setCustomer(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axiosWithAuth()
      .get("/orders/me")
      .then((res) => {
        console.log("res from customer orders", res);
        setOrderData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

//   function editField() {
//     setEditing(!editing);
//   }

  return (
    <div className="orders-wrapper">
      <h1 className="user-title">{customer.customer_name}'s Profile</h1>
      
        <div className="order-info">
          <p>Order #</p>
          <h3>{orderData.id}</h3>


          <p>Product Name</p>
          <h3>{orderData.product_id}</h3>     
          <p>Units</p>
          {/* <h3>{orderData.address}</h3> */}
          <p>Price</p>
          <h3>{orderData.total_price}</h3>
          
          
          <p>Total Price</p>
          <h3>{orderData.total_price}</h3>
          <p>Date</p>
          <h3>{orderData.date_of_order}</h3>
        </div>
      
    </div>
  );
};

export default CustomerOrders;
