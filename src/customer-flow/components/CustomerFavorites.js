import React, { useState, useEffect } from "react";
import axiosWithAuth from "../../utils/axiosWithAuth";
import "../../styles/css/customer/customer_profile.css";

const CustomerFavorites = ({ name }) => {

  const [ favorites, setFavorites] = useState([]);

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
      .get("/customers/favorites/me")
      .then((res) => {
        console.log("res from customer favorites", res);
        setFavorites(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

//   function editField() {
//     setEditing(!editing);
//   }

  return (
    <div className="favorites-wrapper">
      <h1 className="user-title">{name}'s Profile</h1>

        <div className="favorites-info">

          {  favorites.map(item => (

          <div>
            <p>Vendor Name</p>
            <h3>{item.business_name}</h3>
            <p>Units</p>
            <h3>{item.vendor_category}</h3>

          </div>

        ))}

        </div>

    </div>
  );
};

export default CustomerFavorites;
