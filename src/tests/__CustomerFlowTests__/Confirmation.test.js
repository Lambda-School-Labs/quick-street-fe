import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider as AuthProvider } from "../../contexts/AuthContext";
import { Provider as CartProvider } from "../../contexts/CartContext";
import { BrowserRouter as Router } from "react-router-dom";
import Confirmation from "../../customer-flow/components/Confirmation";

describe("running tests on confirmation page", () => {
  const tree = (
    <Router>
      <Confirmation />
    </Router>
  );
  it(`Confirmation page loads`, () => {
    const { getByTestId } = render(tree);
    expect(getByTestId("confirmation-wrapper")).toBeInTheDocument();
  });
  it(`Confirmation title exists`, () => {
    const { getByText } = render(tree);

    expect(getByText("Order Confirmation")).toBeVisible();
  });
  it(`Back button exists`, () => {
    const { getByText } = render(tree);

    expect(getByText("Back to Search")).toBeVisible();
  });
});
