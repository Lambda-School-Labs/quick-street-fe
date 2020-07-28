import React, { useState, useEffect } from "react";
import axiosWithAuth from "../../utils/axiosWithAuth";
import "../../styles/css/customer/customer_favorites.css";

const CustomerFavorites = ({ name }) => {
  const [favorites, setFavorites] = useState([]);

  const handleDelete = (favid) => {
    axiosWithAuth()
      .delete(`/customers/favorites/delete/${favid}`)
      .then((res) => {
        console.log("res from fav delete", res);
        setFavorites(favorites.filter((item) => item.id !== favid));
      })
      .catch((err) => console.log(err));
  };

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
      <h1 className="user-title">{name}'s Favorites</h1>

      <div className="customer-info">
        {favorites.map((item) => (
          <div>
            <p className="vendor-title">Vendor Name:</p>
            <h3>{item.business_name}</h3>
            <p className="vendor-title">Vendor Category:</p>
            <h3>{item.vendor_category}</h3>
            <button onClick={() => handleDelete(item.id)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerFavorites;
