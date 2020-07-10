import React from "react";
import { render, getByText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Search from "../../components/Browse/BrowsePage/Search";
import { BrowserRouter as Router } from "react-router-dom";
test(`Checks that vendors are loaded when data exists`, () => {
  const vendors = [
    {
      business_name: "cat store",
      city: "glendale",
      zipcode: 94107,
    },
  ];
  const { getByText } = render(
    <Router>
      <Search vendors={vendors} zipcode={"94107"} />
    </Router>
  );
  const message = getByText("Showing all (1)");
  expect(message).toBeInTheDocument();
  const vendor = getByText("cat store");
  expect(vendor).toBeInTheDocument();
  const button = getByText("View");
  expect(button).toBeInTheDocument();
});

test(`Checks that page looks proper without data`, () => {
  const vendors = [
    {
      business_name: "cat store",
      city: "glendale",
      zipcode: 94107,
    },
  ];
  const { getByText, getAllByTestId } = render(
    <Router>
      <Search vendors={vendors} zipcode={""} />
    </Router>
  );
  const message = getByText(
    "Your results will display here once you have set a location"
  );
  expect(message).toBeInTheDocument();
  const vendor = getAllByTestId("placeholder");
  expect(vendor).toHaveLength(6);
});
