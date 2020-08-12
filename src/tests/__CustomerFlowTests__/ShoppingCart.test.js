import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { FavoritesContext } from "../../contexts/FavoritesContext";
import ShoppingCart from "../../customer-flow/components/ShoppingCart";

describe("running tests on login", () => {
  let favorites = [1, 2, 3, 4, 5];
  let subtotal = 1000;
  let setCart = jest.fn();
  let cart = [
    {
      vendor_id: 1,
      name: "bone",
      public_id: "j4jtgeyfuaxvsnm1ejwj",
      description: "dog bone treat",
      product_category: "food",
      diet_category: ["Keto"],
      price: 6.3,
    },
    {
      vendor_id: 2,
      name: "catnip",
      public_id: "catnip",
      description: "time to get high kitty",
      product_category: "pets",
      diet_category: ["Gluten Free"],
      price: 3.5,
    },
  ];
  const tree = (
    <Router>
      <FavoritesContext.Provider value={{ favorites }}>
        <CartContext.Provider value={{ setCart, cart, subtotal }}>
          <ShoppingCart />;
        </CartContext.Provider>
      </FavoritesContext.Provider>
    </Router>
  );

  it(`loads`, () => {
    const { getByText, getByTestId } = render(tree);
    expect(getByTestId("shopping-cart")).toBeInTheDocument();
  });
});
