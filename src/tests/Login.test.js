import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider as AuthProvider } from "../contexts/AuthContext";
import { Provider as CartProvider } from "../contexts/TestCartContext";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../pages/Login";

describe("running tests on login", () => {
  const tree = (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Login />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
  it(`loads`, () => {
    const { getByText, getAllByText } = render(tree);

    expect(getByText("Welcome Back!")).toBeInTheDocument();
    expect(getAllByText("Login")).toHaveLength(2);
  });
  it(`full component renders`, () => {
    const { getByTestId, getAllByText } = render(tree);

    expect(getByTestId("login-wrapper")).toBeInTheDocument();
  });
  it(`full component renders`, () => {
    const { getByTestId, getAllByText } = render(tree);

    expect(getByTestId("login-wrapper")).toBeInTheDocument();
  });
});
