import React, { useState, useEffect } from "react";
import { Image, CloudinaryContext, Transformation } from "cloudinary-react";

const ShoppingCartItem = ({ item, cartTotal, setCartTotal }) => {
  const [count, setCount] = useState(item.count);
  const [itemTotal, setItemTotal] = useState(count * item.price);
  let newImage = "product-images/" + item.avatar;
  console.log("newimage", newImage);
  const addToCount = () => {
    setCount(count + 1);
  };
  const subtractCount = () => {
    setCount(count - 1);
  };
  useEffect(() => {
    setItemTotal(count * item.price);
    setCartTotal({ ...cartTotal, [item.name]: itemTotal });
  }, [count]);
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
      <button onClick={addToCount}>+</button>
      <p>{count}</p>
      <button onClick={subtractCount}>-</button>
      <p>{itemTotal.toFixed(2)}</p>
    </div>
  );
};
export default ShoppingCartItem;
