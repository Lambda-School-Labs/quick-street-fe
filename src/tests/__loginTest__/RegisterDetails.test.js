import React from "react";

import { render, fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider as AuthProvider } from "../../contexts/AuthContext";
import { Provider as CartProvider } from "../../contexts/TestCartContext";
import { BrowserRouter as Router } from "react-router-dom";
import Register from "../../pages/Register";
import RegisterAll from "../../components/Register/RegisterAll";

describe("running tests on login", () => {
  it(`loads`, () => {
    const tree = (
      <Router>
        <AuthProvider>
          <CartProvider>
            <Register>
              <RegisterAll />
            </Register>
          </CartProvider>
        </AuthProvider>
      </Router>
    );
    const { getByText, getAllByText } = render(tree);

    expect(
      getByText("Create An Account With Quick Street")
    ).toBeInTheDocument();
  });
});
