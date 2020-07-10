import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Vendor from "../pages/Vendor";
import { Provider as AuthProvider } from "../contexts/AuthContext";
import { Provider as CartProvider } from "../contexts/TestCartContext";
import { BrowserRouter as Router } from "react-router-dom";

test(`checks that vendor page loads`, () => {
  const match = {
    params: {
      id: 1,
    },
  };
  const tree = (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Vendor match={match} />
        </CartProvider>
      </AuthProvider>
    </Router>
  );

  const { getByTestId } = render(tree);
  expect(getByTestId("vendor-page")).toBeInTheDocument();
});
