import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import OrderReview from "../pages/OrderReview";
import { Provider as AuthProvider } from "../contexts/AuthContext";
import { Provider as CartProvider } from "../contexts/TestCartContext";
import { BrowserRouter as Router } from "react-router-dom";
import { jssPreset } from "@material-ui/core";

describe("check that orderReview renders", () => {
  it(`loads`, () => {
    const history = {
      goBack: jest.fn(),
    };
    const { getByText, getAllByText } = render(
      <Router>
        <AuthProvider>
          <CartProvider>
            <OrderReview history={history} />
          </CartProvider>
        </AuthProvider>
      </Router>
    );

    expect(getByText("Reviewing My Cart")).toBeInTheDocument();
  });
});
