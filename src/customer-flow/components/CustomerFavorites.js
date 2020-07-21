import React, { useState, useEffect } from "react";
import axiosWithAuth from "../../utils/axiosWithAuth";
import "../../styles/css/customer/customer_profile.css";

const CustomerFavorites = ({ favorites, setFavorites }) => {
    const [customer, setCustomer] = useState({
        customer_name: ""
    })
  const [ favoritesData, setFavoritesData] = useState({
    vendor_name: "",
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
      .get("/customerFavorites/me")
      .then((res) => {
        console.log("res from customer favorites", res);
        setFavoritesData(res.data);
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
          <p>Vendor Name</p>
          <h3>{favoritesData.vendor_name}</h3>
{/*
          <p>Product Name</p>
          <h3>{favoritesData.product_id}</h3> */}

        </div>

    </div>
  );
};

export default CustomerFavorites;
