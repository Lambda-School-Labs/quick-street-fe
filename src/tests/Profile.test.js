import React, { useContext } from "react";
import About from "../components/Profile/Profile/About";
import { render, cleanup, fireEvent } from "@testing-library/react";

describe("test that profile page", () => {
  const fakeData = {
    business_name: "Cat Face",
    phone: "555-555-1234",
    address: "1234 Stanley Ave",
    zipcode: 91206,
    city: "glendale",
    description: "a store for dog goodies",
    vendor_category: "pets",
    bulletin: "here is dog stuff to know",
    hours: "10am to 11pm",
    email: "dog@123.com",
  };
  it("testing that about component renders", () => {
    const { getByText } = render(<About vendorInfo={fakeData} />);
    expect(getByText("Cat Face")).toBeInDocument();
  });
});
