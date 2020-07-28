import React, { useState } from "react";
import "../../styles/css/customer/shopping_slidein.css";
const ShoppingSlidein = ({ handleSidebar }) => {
  return (
    <div className="cart-drawer">
      <h1>This is your shopping cart</h1>
      <button onClick={handleSidebar}>Close</button>
    </div>
  );
};
export default ShoppingSlidein;
