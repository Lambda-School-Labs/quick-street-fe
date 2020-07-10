import React from "react";

import { render, fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
// import { Provider as AuthProvider } from "../contexts/AuthContext";
// import { Provider as CartProvider } from "../contexts/TestCartContext";
// import { BrowserRouter as Router } from "react-router-dom";
import EditProductForm from "../../components/Profile/Product/EditProductForm";

test(`loads`, () => {
  const dummyProduct = {
    vendor_id: 1,
    name: "bone",
    public_id: "j4jtgeyfuaxvsnm1ejwj",
    description: "dog bone treat",
    product_category: "food",
    diet_category: ["Keto"],
    price: 6.3,
  };
  const tree = (
    // <Router>
    //   <AuthProvider>
    //     <CartProvider>
    <EditProductForm product={dummyProduct} />
    //     /* </CartProvider>
    //   </AuthProvider>
    // </Router> */
  );
  const { getByTestId } = render(tree);
  expect(getByTestId("editproductform")).toBeInTheDocument();
});
