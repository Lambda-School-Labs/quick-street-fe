import React, { useState, useEffect } from "react";

import axiosWithAuth from "../../../../utils/axiosWithAuth";
import Product from "./ViewVendorProduct";
//styling
import profile from "../../../../styles/scss/profile.module.scss";
const ViewVendorProducts = (props) => {
  const [vendorProducts, setVendorProducts] = useState([]);

  const getVendorProducts = (id) => {
    axiosWithAuth()
      .get(`/vendors/${id}/products`)
      .then((response) => {
        // console.log("viewvendorsProducts response", response);
        setVendorProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getVendorProducts(props.vendorId);
  }, []); // removed [] dependency

  return (
    <div className={profile.products_container}>
      <div className={profile.products_wrapper}>
        <h1>Products</h1>
        <div className={profile.products_card_wrapper}>
          {vendorProducts.map((product) => (
            <Product
              vendor={props.vendor}
              product={product}
              key={product.id}
              vendorId={props.vendorId}
            />
          ))}
          {vendorProducts.length === 0 && (
            <p className="no_products_content">
              There are no products to show right now.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewVendorProducts;
