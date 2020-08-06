import React, { useState, useEffect } from "react";
import { Link, NavLink, Route } from "react-router-dom";
import axiosWithAuth from "../../utils/axiosWithAuth";
import "../../styles/css/customer/customer_favorites.css";
import {
  Image,
  CloudinaryContext,
  Transformation,
} from "cloudinary-react";

const CustomerConfirmation = ({ name }) => {

  return (
    <div className="favorites-wrapper">
      <h1 className="user-title">Order Confirmation</h1>

      <div className="fav-info">
        <div>
          <h1>Thanks for ordering!</h1>
        </div>
      </div>
    </div>
  );
};

export default CustomerConfirmation;
