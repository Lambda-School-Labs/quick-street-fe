import React, { useState, useEffect } from "react";
import { Link, NavLink, Route } from "react-router-dom";
import axiosWithAuth from "../../utils/axiosWithAuth";
import "../../styles/css/customer/customer_favorites.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {
  Image,
  CloudinaryContext,
  Transformation,
} from "cloudinary-react";

const CustomerFavorites = ({ name }) => {
  const [favorites, setFavorites] = useState([]);
  console.log("FAVORITES", favorites);

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
        let uniqueName = new Set([]);
        let newArray = res.data.filter((item) => {
          if (!uniqueName.has(item.business_name)) {
            uniqueName.add(item.business_name);
            return true;
          }
          return false;
        });
        console.log("newArray", newArray)
        let newPid = newArray.map(pid => {
          // console.log("PUBLIC ID", pid.public_id)
          let image = "product-images/" + pid.public_id;
          return{...pid, public_id: image}
        })
        // console.log("NEW PID", newPid)
        setFavorites(newPid);
      })
      .catch((err) => console.log(err));
  }, [setFavorites]);

  //   function editField() {
  //     setEditing(!editing);
  //   }

console.log("favorites before map", favorites)

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
                  <td>
                  <CloudinaryContext cloudName="quickstlabs">
                    <Image publicId={item.public_id}>
                      <Transformation height="75" width="75" crop="fill" />
                    </Image>
                  </CloudinaryContext>
                  </td>
                  <td>
                    <Link to={`/customerHome/browse/${item.vid}`}>
                      {item.business_name}
                    </Link>
                  </td>
                  <td>{item.vendor_category}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      X
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CustomerFavorites;
