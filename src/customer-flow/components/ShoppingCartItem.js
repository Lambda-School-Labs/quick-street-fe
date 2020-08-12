import React, { useState, useEffect } from "react";
import { Image, CloudinaryContext, Transformation } from "cloudinary-react";
import "../../styles/css/customer/shopping_cart.css";

const ShoppingCartItem = ({ item, addToCount, subtractCount }) => {
  let itemTotal = item.count * item.price;
  let count = item.count;

  //cloudinary vars
  let newImage = "product-images/" + item.avatar;

  return (
    <div className="product-card" data-testid="product-card">
      <h1>{item.name}</h1>
      <div className="bottom-content">
        <CloudinaryContext cloudName="quickstlabs">
          <Image
            // className={props.product.profile_product_image}
            publicId={newImage}
            //  && productImages[0].public_id}
          >
            <Transformation height="120" width="180" crop="fill" />
          </Image>
        </CloudinaryContext>
        <div className="namePrice">
          <p>{item.business_name}</p>
          <p>${item.price}</p>
        </div>
        <div className="button-block">
          <button onClick={() => subtractCount(item)}>-</button>
          <p>{count}</p>
          <button onClick={() => addToCount(item)}>+</button>
        </div>
        <div className="itemTotal">
          <p>${itemTotal.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};
export default ShoppingCartItem;
