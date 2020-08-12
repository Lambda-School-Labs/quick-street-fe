import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CustomerProfile from "../../customer-flow/components/CustomerProfile";

describe("running tests on login", () => {
  const name = "brett";

  const tree = <CustomerProfile name={name} />;
  it(`loads`, () => {
    const { getByText, getByTestId } = render(tree);

    expect(getByTestId("customer-profile")).toBeInTheDocument();
  });
});
