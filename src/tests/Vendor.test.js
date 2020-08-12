import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Vendor from "../pages/Vendor";
import { Provider as AuthProvider } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";
import { FavoritesContext } from "../contexts/FavoritesContext";
import { BrowserRouter as Router } from "react-router-dom";

test(`checks that vendor page loads`, () => {
  const location = { pathname: "/dashboard/" };
  let favorites = [1, 2, 3, 4, 5];

  const tree = (
    <Router>
      <AuthProvider>
        <FavoritesContext.Provider value={{ favorites }}>
          <CartContext.Provider>
            <Vendor location={location} />
          </CartContext.Provider>
        </FavoritesContext.Provider>
      </AuthProvider>
    </Router>
  );

  const { getByTestId } = render(tree);
  expect(getByTestId("vendor-page")).toBeInTheDocument();
});
