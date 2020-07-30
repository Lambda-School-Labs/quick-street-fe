import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { logo, arrow, cart } from "../../assets/svgs/customerflow";
import { CartContext } from "../../contexts/CartContext";
import { Image, CloudinaryContext, Transformation } from "cloudinary-react";
import "../../styles/css/customer/shopping_cart.css";

const ShoppingCart = () => {
  const { cart, setCart, price, setPrice } = useContext(CartContext);
  let newArray = cart.map((item) => {
    let count = cart.filter((el) => el.id === item.id).length;
    console.log("ITEM COUNT", item.count);
    return { ...item, count: count };
  });

  let unique = [...new Set(newArray.map((a) => a.name))];
  let newCart = [];
  newArray.forEach((item) => {
    if (unique.includes(item.name)) {
      newCart.push(item);
      unique = unique.filter((e) => e !== item.name);
    }
  });
  console.log("cart madness.", newArray);
  console.log("UNIQUE", unique);
  console.log("BEHOLD THE NEW CART", newCart);
  console.log("cart contents on shopping cart page", cart);
  return (
    <div className="cart-page">
      <section className="left-cart-wrapper">
        <div className="mk-logo">
          <Link to="/">
            <img src={logo} alt="market avenue logo" />
          </Link>
        </div>
        <div className="back-arrow">
          <Link to="/customerHome">
            <img src={arrow} alt="backwards arrow" />
            back to products
          </Link>
        </div>
        <div className="left-content">
          {newCart.length > 0 ? (
            newCart.map((item) => {
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
                  <button>+</button>
                  <p>{item.count}</p>
                  <button>-</button>
                </div>
              );
            })
          ) : (
            <h1>Shopping Cart is empty</h1>
          )}
        </div>
      </section>
      <section className="right-cart-wrapper">
        <h1>Subtotal: ${price.toFixed(2)} </h1>
        <p>Taxes(where applicable) added at checkout</p>
        <button className="checkout-btn">Checkout</button>
      </section>
    </div>
  );
};
export default ShoppingCart;

// cart -> count of items -> only unique items ->
