import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  getByTestId,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider as AuthProvider } from "../../contexts/AuthContext";
import { Provider as CartProvider } from "../../contexts/TestCartContext";
import { BrowserRouter as Router } from "react-router-dom";
import Browse from "../../pages/Browse";

describe("running tests on login", () => {
  const tree = (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Browse />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
  it(`full component renders`, () => {
    const { getByTestId } = render(tree);

    expect(getByTestId("browse-wrapper")).toBeInTheDocument();
  });
});
