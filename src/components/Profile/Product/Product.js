import React, { useEffect, useState } from "react";
import axiosWithAuth from "../../../utils/axiosWithAuth";
import { Image, CloudinaryContext, Transformation } from "cloudinary-react";
import product from "../../../styles/scss/vendor/a_vendors_products.module.scss";

const Product = ({
  name,
  // img,
  price,
  productId,
  setReloadProducts,
  reloadProducts,
  trigger,
  setTrigger,
}) => {
  const [productImages, setProductImages] = useState("");

  useEffect(() => {
  	axiosWithAuth()
  		.get(`/products/${productId}/product-images`)
  		.then(response => {
        let newImage = "product-images/" + response.data[0].public_id
        setProductImages(...productImages, newImage);
  		})
  		.catch(error => {
        console.log(`ERROR GET /:productId/product-images Product.js`, error);
  		})
    }, []);

  return (
    <div className={product.vendor_product}>
      <CloudinaryContext cloudName="quickstlabs">
        <Image
          className={product.profile_product_image}
          publicId={productImages}
          //  && productImages[0].public_id}
        >
          <Transformation height="122" width="146" crop="fill" />
        </Image>
      </CloudinaryContext>
      {/* <div className="vendor_product_body"> */}
      <p className={product.vendor_product_name}>{name}</p>
      <p className={product.vendor_product_price}>${price}</p>
    </div>
  );
};

export default Product;
