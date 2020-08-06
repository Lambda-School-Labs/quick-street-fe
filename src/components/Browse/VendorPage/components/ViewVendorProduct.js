import React, { useState, useEffect, useContext } from "react";
import axiosWithAuth from "../../../../utils/axiosWithAuth";
import { CartContext } from "../../../../contexts/CartContext";

//stlying
import { Image, CloudinaryContext, Transformation } from "cloudinary-react";
import "../../../../styles/css/customer/customer_view_profile.css";
import { add } from "../../../../styles/css/vendor/vendor_product_page.css";

const ViewVendorProduct = (props) => {
  const { cart, addToCount } = useContext(CartContext);

  const handleAdd = () => {
    addToCount({
      business_name: props.vendor.business_name,
      avatar: props.product.public_id,
      id: props.product.id,
      name: props.product.name,
      price: props.product.price,
    });
    console.log("what is in the cart", cart);
  };

  let newImage = "product-images/" + props.product.public_id;

  return (
    <>
      <div
        // onClick={() => showHideModal(true)}
        className="vendor-product-cards"
        key={props.product.id}
      >
        <CloudinaryContext cloudName="quickstlabs">
          <Image
            className={props.product.profile_product_image}
            publicId={newImage}
          >
            <Transformation height="210" width="280" crop="fill" />
          </Image>
        </CloudinaryContext>
        <p>{props.product.name}</p>
        <p>${props.product.price}</p>
        <button className={add} onClick={() => handleAdd()}>
          ADD to Cart
        </button>
      </div>
    </>
  );
};

export default ViewVendorProduct;
