import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ShoppingCartItem from "../../customer-flow/components/ShoppingCartItem";

describe("running tests on shoppingcartItem", () => {
  const item = { count: 5, price: 5.5 };
  const component = <ShoppingCartItem item={item} />;

  it(`loads`, () => {
    const { getByText, getByTestId } = render(component);

    expect(getByTestId("product-card")).toBeInTheDocument();
    expect(getByText("$5.5")).toBeVisible();
  });
});
