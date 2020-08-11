import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider as AuthProvider } from "../../contexts/AuthContext";
import { Provider as CartProvider } from "../../contexts/CartContext";
import { BrowserRouter as Router } from "react-router-dom";
import CustomerFavorites from "../../customer-flow/components/CustomerFavorites";

describe("running tests on confirmation page", () => {
  const name = "Michael";
  const comp = <CustomerFavorites name={name} />;
  it(`CustomerFavorites loads`, () => {
    const { getByTestId } = render(comp);
    expect(getByTestId("favorites-wrapper")).toBeInTheDocument();
  });
  it(`Name appears in title`, () => {
    const { getByText } = render(comp);
    expect(getByText("Michael's Favorites")).toBeVisible();
  });
});
