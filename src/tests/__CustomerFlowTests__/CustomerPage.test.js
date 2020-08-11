import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as AuthProvider } from "../../contexts/AuthContext";
import { Provider as CartProvider } from "../../contexts/CartContext";
import CustomerPage from "../../customer-flow/components/CustomerPage";

describe("running tests on login", () => {
  //   const name = "Greg";
  let cart = "dude";
  //   let signup = jest.fn();
  //   const CartContext = React.createContext();
  const tree = (
    <Router>
      <CartProvider>
        <CustomerPage />
      </CartProvider>
    </Router>
  );
  it(`loads`, () => {
    const { getByText, getByTestId } = render(<CustomerPage />);

    expect(
      getByText("Welcome to Customer Dashboard, Greg.")
    ).toBeInTheDocument();
    expect(getByTestId("page")).toBeInTheDocument();
    expect(getByTestId("component-section")).toBeInTheDocument();
  });
});
