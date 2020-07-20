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
      .get("/orders/")
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
      
        {/* <div className="customer-info" onClick={editField}>
          <p>Name</p>
          <h3>{formData.customer_name}</h3>
          <p>Address</p>
          <h3>{formData.address}</h3>
          <p>Phone Number</p>
          <h3>{formData.phone_number}</h3>
          <p>Zip Code</p>
          <h3>{formData.zip_code}</h3>
        </div> */}
      
    </div>
  );
};

export default CustomerOrders;
