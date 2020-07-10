import React, { useContext } from "react";
import About from "../components/Profile/Profile/About";
import "@testing-library/jest-dom/extend-expect";
import VendorProducts from "../components/Profile/Product/VendorProducts";
import { BrowserRouter as Router } from "react-router-dom";
import ProfilePage from "../pages/ProfilePage";
import Bulletin from "../components/Profile/Bulletin/Bulletin";
import { render, cleanup, fireEvent } from "@testing-library/react";
import VendorCategories from "../components/Profile/Profile/VendorCategories";

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
  const dummyProducts = [
    {
      id: 1,
      name: "bone",
      price: 6.3,
    },
    {
      id: 2,
      name: "catnip",
      price: 3.5,
    },
  ];
  it("testing that about component renders", () => {
    const { getByText } = render(<About vendorInfo={fakeData} />);
    let doggies = getByText("a store for dog goodies");
    expect(doggies).toBeInTheDocument();
  });
  it("testing that VendorProducts cards render", () => {
    const { getByText } = render(<VendorProducts products={dummyProducts} />);
    let name = getByText("catnip");
    let price = getByText("$3.5");
    expect(name).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });
  it("testing that VendorProducts component renders", () => {
    const { getByTestId } = render(<VendorProducts products={dummyProducts} />);
    let wrapper = getByTestId("products-wrapper");
    expect(wrapper).toBeInTheDocument();
  });
  it("testing that Bulletin component renders", () => {
    const { getByTestId } = render(<Bulletin />);
    const wrapper = getByTestId("bulletin-wrapper");
    expect(wrapper).toBeInTheDocument();
  });
  it("testing that vendorCategories component renders", () => {
    const dummyData = {
      users_id: 7,
      business_name: "the dog store",
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
    const { getByTestId } = render(<VendorCategories vendorInfo={dummyData} />);
    const wrapper = getByTestId("vendorcat-wrapper");
    expect(wrapper).toBeInTheDocument();
  });

  // it("testing that the whole Profile page appears", () => {
  //   const { getByTestId } = render(<ProfilePage />);
  //   const profile = getByTestId("profile-page");
  //   expect(profile).toBeInTheDocument();
  // });
});
