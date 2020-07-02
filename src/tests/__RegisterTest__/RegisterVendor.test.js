import React, { useState } from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider as AuthProvider } from "../../contexts/AuthContext";
import { Provider as CartProvider } from "../../contexts/TestCartContext";
import { BrowserRouter as Router } from "react-router-dom";
import Register from "../../pages/Register";
import RegisterVendor from "../../components/Register/Vendor/RegisterVendor";
import CustomButton from "../../components/shared/CustomButton";

describe("running tests on vendor registry", () => {
  //arrange (render component and set up mock data)
  //act
  //assert
  let dummyData = {
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
    role: "",
    roleError: "",
    business_name: "",
    business_nameError: "",
    phone: "",
    phoneError: "",
    address: "",
    city: "",
    zipcode: "",
    zipcodeError: "",
  };

  let handleChange = (event) =>
    (dummyData = {
      ...dummyData,
      [event.target.name]: event.target.value,
      emailError: "",
      passwordError: "",
      roleError: "",
      business_nameError: "",
      phoneError: "",
      zipcodeError: "",
    });

  const tree = (
    <Router>
      <AuthProvider>
        <CartProvider>
          <RegisterVendor values={dummyData} handleChange={handleChange} set />
        </CartProvider>
      </AuthProvider>
    </Router>
  );

  afterEach(cleanup);

  it(`renders the Component`, () => {
    const { getByText } = render(tree);
    expect(getByText("Great!")).toBeInTheDocument();
    expect(getByText(`Let's get you set up.`)).toBeInTheDocument();
  });

  it(`Check that all fields exist. `, () => {
    const { getByTestId, getByText, getByLabelText } = render(tree);
    expect(getByText(`Business Name`)).toBeInTheDocument();
    expect(getByText("Phone Number")).toBeInTheDocument();
    expect(getByText("Street Address")).toBeInTheDocument();
    expect(getByLabelText("City")).toBeInTheDocument();
    expect(getByLabelText("Zipcode")).toBeInTheDocument();
    expect(getByTestId("business-input")).toBeInTheDocument();
    expect(getByTestId("phone-input")).toBeInTheDocument();
    expect(getByTestId("street-input")).toBeInTheDocument();
    expect(getByTestId("city-input")).toBeInTheDocument();
    expect(getByText("Update Vendor Info")).toBeInTheDocument();
    expect(getByText("Back")).toBeInTheDocument();
  });

  it("Error handling- blank errors", () => {
    const { getByTestId, getByText } = render(tree);
    const register = getByText("Update Vendor Info");
    fireEvent.click(register);
    expect(getByTestId("phone-error")).toHaveTextContent(
      "Phone number required"
    );
    expect(getByTestId("business-error")).toHaveTextContent(
      "Business name required"
    );
    expect(getByTestId("zip-error")).toHaveTextContent("Zipcode required");
  });
});
