import React, { useState, useEffect } from "react";
import { Image, CloudinaryContext, Transformation } from "cloudinary-react";

const ShoppingCartItem = ({ item, addToCount, subtractCount }) => {
  let itemTotal = item.count * item.price;
  let count = item.count;

  //cloudinary vars
  let newImage = "product-images/" + item.avatar;
  console.log("newimage", newImage);

  return (
    <div>
      <CloudinaryContext cloudName="quickstlabs">
        <Image
          // className={props.product.profile_product_image}
          publicId={newImage}
          //  && productImages[0].public_id}
        >
          <Transformation height="122" width="146" crop="fill" />
        </Image>
      </CloudinaryContext>
      <p>{item.name}</p>
      <p>{item.business_name}</p>
      <p>{item.price}</p>
      <button onClick={() => addToCount(item)}>+</button>
      <p>{count}</p>
      <button onClick={() => subtractCount(item)}>-</button>
      <p>{itemTotal.toFixed(2)}</p>
    </div>
  );
};
export default ShoppingCartItem;
