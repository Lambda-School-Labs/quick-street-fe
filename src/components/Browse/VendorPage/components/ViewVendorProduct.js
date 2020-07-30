import React, { useState, useEffect, useContext } from "react";
import axiosWithAuth from "../../../../utils/axiosWithAuth";
import { CartContext } from "../../../../contexts/CartContext";

//stlying
import {
  Image,
  CloudinaryContext,
  Context,
  Transformation,
} from "cloudinary-react";
import profile from "../../../../styles/scss/profile.module.scss";
import modal from "../../../../styles/scss/browseModal.module.scss";
import { CustomButton } from "../../../index";
import { Modal } from "../../../index";
import ModalCarousel2 from "./ModalCarousel2";
import { add } from "../../../../styles/css/vendor/vendor_product_page.css";

const ViewVendorProduct = (props) => {
  const { cart, setCart } = useContext(CartContext);

  console.log("vendorId on viewVendorProduct", props.vendorId);
  console.log("view vendor props, not only the id?", props.product);
  console.log("vendor props", props.vendor);

  const handleAdd = () => {
    setCart([
      ...cart,
      {
        business_name: props.vendor.business_name,
        avatar: props.product.public_id,
        id: props.product.id,
        name: props.product.name,
        price: props.product.price,
      },
    ]);
    console.log("what is in the cart", cart);
  };

  let newImage = "product-images/" + props.product.public_id;
  console.log("newimage", newImage);

  return (
    // <h1>Hello there</h1>
    <>
      <div
        // onClick={() => showHideModal(true)}
        className={profile.products_card}
        key={props.product.id}
      >
        <p className={profile.name}>{props.product.name}</p>
        <p className={profile.price}>${props.product.price}</p>
        <CloudinaryContext cloudName="quickstlabs">
          <Image
            className={props.product.profile_product_image}
            publicId={newImage}
            //  && productImages[0].public_id}
          >
            <Transformation height="122" width="146" crop="fill" />
          </Image>
        </CloudinaryContext>
        <button className={add} onClick={() => handleAdd()}>
          ADD to Cart
        </button>
      </div>
    </>
  );
};

export default ViewVendorProduct;

// const handleAddToCart = () => {
//   showHideModal(false);
//   if (cart.items.length === 0 || cart.items[0].item.vendor === vendorId) {
//     addCartItem({
//       productId: props.product._id,
//       price: props.product.price,
//       quantity: quantity,
//       customerId: customerId,
//     });
//   } else {
//     setMessageModal(true);
//   }
// };

// const handleEmptyCart = () => {
//   setMessageModal(false);
//   addItemFromOtherVendor({
//     cartId: cart._id,
//     customerId,
//     productId: props.product.id,
//     price: props.product.price,
//     quantity: quantity,
//   });
// };

//   useEffect(() => {
//     axiosWithAuth()
//       .get(`/images/${props.product.id}/product-images`)
//       .then((response) => {
//         console.log("ViewVendorProducts.js response", response);
//         setImages(response.data.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   const modalLeftStyle = {
//     width: "50%",
//   };

{
  /* <img className={profile.image} src={images[0] ? images[0].secure_url : ""} alt="img" /> */
}
{
  /* <Context cloudName="quickstlabs">
          <Image
            className={profile.image}
            publicId={images[0] && images[0].public_id}
          >
            <Transformation height="122" width="146" crop="fill" />
          </Image>
        </Context> */
}

{
  /* <Modal showModal={showModal}>
  <div className={modal.container}> */
}
{
  /* <div className={modal.column_left} style={modalLeftStyle}>
      {/* <img src={images[0] ? images[0].secure_url : ""} alt="img" /> */
}
{
  /* <ModalCarousel images={images} /> */
}
{
  /* <ModalCarousel2 images={images} />
    </div> */
}
{
  /* <div className={modal.column_right}>
      <div className={modal.row}>
        <h1>{props.product.name}</h1>
      </div>
      <div className={modal.row}>
        <div className={modal.tags}>
          <ul>
            {props.product.diet_category.map((diet, index) => (
              <div key={index}>
                <li>{diet}</li>
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className={modal.row}>
        <h2>{props.product.description}</h2>
      </div>

      <div className={modal.row_price}>
        <h1>${props.product.price}</h1>
      </div>

      <div className={modal.row_quantity}>
        <h3>Quantity: </h3>
        <input
          name="quantity"
          type="number"
          value={quantity}
          onChange={handleChange}
          min="1"
          max="10"
        />
      </div>
      <div className={modal.button_wrapper}>
        <div className={modal.button_left}>
          <CustomButton
            styleClass="red-full"
            onClick={() => showHideModal(false)}
          >
            Close
          </CustomButton>
        </div>
        <div className={modal.button_right}>
          <CustomButton styleClass="green-full" onClick={handleAddToCart}>
            Add To Cart
          </CustomButton>
        </div>
      </div>
    </div>
  </div>
  <div class={modal.overlay} id={modal.overlay}></div>
</Modal>

<Modal showModal={messageModal}>
  <div className={modal.change_vendor_container}>
    <h1>Cart not empty</h1>
    <h3>Cart contains items from a different vendor.</h3>
    <h3>Empty the cart and add this item?</h3>

    <div className={modal.button_wrapper}>
      <div className={modal.button_left}>
        <CustomButton
          styleClass="green-full"
          onClick={() => setMessageModal(false)}
        >
          Cancel
        </CustomButton>
      </div>
      <div className={modal.button_right}>
        <CustomButton styleClass="red-full" onClick={handleEmptyCart}>
          Empty Cart
        </CustomButton>
      </div>
    </div>
  </div>
</Modal> */
}
