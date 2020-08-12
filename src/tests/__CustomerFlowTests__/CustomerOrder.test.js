import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import CustomerOrders from "../../customer-flow/components/CustomerOrders";

describe("running tests on login", () => {
  const name = "Cat";
  const tree = <CustomerOrders name={name} />;
  it(`loads`, () => {
    const { getByText, getByTestId } = render(tree);

    expect(getByText("Cat's Orders")).toBeInTheDocument();
    expect(getByTestId("orders-wrapper")).toBeInTheDocument();
  });
});
