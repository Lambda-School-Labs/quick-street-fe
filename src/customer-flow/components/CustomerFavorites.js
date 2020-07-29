import React, { useState, useEffect } from "react";
import axiosWithAuth from "../../utils/axiosWithAuth";
import "../../styles/css/customer/customer_favorites.css";
import  Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button'

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

      <div className="fav-info">
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <td>Image</td>
                  <td>Vendor</td>
                  <td>Type</td>
                  <td>Remove</td>
                </tr>
              </thead>

              <tbody>
              {favorites.map((item) => (
                <tr>
                  <td><img className="vendor-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRwtXhvRASVUoRwvqztf6c4dgxjNpiGtY0XvabJyraHKhLA2tT9Ls8lAxnxLCE&usqp=CAc" /></td>
                  <td>{item.business_name}</td>
                  <td>{item.vendor_category}</td>
                  <td><Button variant="danger" onClick={() => handleDelete(item.id)}>X</Button></td>
                  </tr>))}
              </tbody>
            </Table>
          </div>

      </div>
    </div>
  );
};

export default CustomerFavorites;

{/* <button onClick={() => handleDelete(item.id)}>X</button> */}

// {item.vendor_category}
