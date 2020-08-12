import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import CustomerForm from "../../customer-flow/components/CustomerForm";

describe("running tests on login", () => {
  const tree = <CustomerForm />;
  it(`loads`, () => {
    const { getByText, getByTestId } = render(tree);

    expect(getByText("Customer Profile")).toBeInTheDocument();
    expect(getByTestId("customerform-wrapper")).toBeInTheDocument();
  });
});
