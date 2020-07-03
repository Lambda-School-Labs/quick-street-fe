import React, { useContext } from "react";
import registration from "../../../styles/scss/registration.module.scss";
import axiosWithAuth from "../../../utils/axiosWithAuth";
import { CustomButton } from "../../index";
import { Context as AuthContext } from "../../../contexts/AuthContext";
//Page 2 of vendor registry
const RegisterVendor = (props) => {
  const { values, handleChange, previousStep, setUserInfo } = props;
  const updateVendor = () => async ({
    business_name,
    phone,
    address,
    city,
    zipcode,
  }) => {
    try {
      const response = await axiosWithAuth().post("/vendors/add", {
        business_name,
        phone,
        address,
        zipcode,
        city,
      });
      console.log("this is the response", response);
      if (response.status === 200) {
        console.log("response after creating a user", response);
        window.location.href = `/profile`;
      }
    } catch (error) {
      console.log("Error while creating a user", error.response);
    }
  };

  const validate = () => {
    console.log("these are the values", values);
    let business_nameError = "";
    let phoneError = "";
    let zipcodeError = "";
    let fakeNumber = "";
    if (values.phone) {
      fakeNumber = values.phone.toString();
    }

    if (!values.business_name) {
      business_nameError = "Business name required";
    }

    if (!values.phone) {
      phoneError = "Phone number required";
    }

    if (
      values.phone &&
      !fakeNumber.match(/^(\d{1})?(-0?1\s)?\(?\d{3}\)?-?\d{3}-?\d{4}$/g)
    ) {
      phoneError = "Please match an accepted phone format";
    }

    if (!values.zipcode) {
      zipcodeError = "Zipcode required";
    }
    if (values.zipcode.length < 5) {
      zipcodeError = "Please enter a valid zipcode";
    }

    if (business_nameError || phoneError || zipcodeError) {
      setUserInfo({
        ...values,
        business_nameError,
        phoneError,
        zipcodeError,
      });
      return false;
    }

    return true;
  };

  const cancel = (event) => {
    event.preventDefault();
    previousStep();
  };

  return (
    <div className={registration.wrapper}>
      <h1>Great!</h1>
      <h1>Let's get you set up.</h1>
      <form className={registration.form_step2}>
        <label htmlFor="business_name">Business Name</label>
        <input
          type="text"
          name="business_name"
          id="businessName"
          data-testid="business-input"
          // placeholder='Enter your business name'
          onChange={handleChange}
          value={values.business_name}
        />
        <div data-testid="business-error" className={registration.errorMessage}>
          {values.business_nameError}
        </div>

        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          name="phone"
          id="phoneNumber"
          data-testid="phone-input"
          // placeholder='Enter your phone number'
          value={values.phone}
          onChange={handleChange}
        />
        <div data-testid="phone-error" className={registration.errorMessage}>
          {values.phoneError}
        </div>

        <label htmlFor="address">Street Address</label>
        <input
          type="text"
          name="address"
          id="streetAddress"
          data-testid="street-input"
          // placeholder='Enter your street address'
          value={values.address}
          onChange={handleChange}
        />

        <div className={registration.city_zip_container}>
          <div className={registration.city}>
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              id="city"
              data-testid="city-input"
              // placeholder='Enter your city'
              value={values.city}
              onChange={handleChange}
            />
          </div>
          <div className={registration.city_zip}>
            <label htmlFor="zipcode">Zipcode</label>
            <input
              type="text"
              name="zipcode"
              id="zipcode"
              data-testid="zip-input"
              // placeholder='Enter your zipcode'
              value={values.zipcode}
              onChange={handleChange}
            />
            <div data-testid="zip-error" className={registration.errorMessage}>
              {values.zipcodeError}
            </div>
          </div>
        </div>

        <CustomButton styleClass="green-border" onClick={cancel}>
          Back
        </CustomButton>
        <CustomButton
          styleClass="green-full"
          onClick={(e) => {
            e.preventDefault();
            if (validate()) {
              updateVendor(values);
            }
          }}
        >
          Update Vendor Info
        </CustomButton>
      </form>
    </div>
  );
};

export default RegisterVendor;
