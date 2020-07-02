import React, { useContext } from "react";
import registration from "../../../styles/scss/registration.module.scss";
import { CustomButton } from "../../index";
import { Context as AuthContext } from "../../../contexts/AuthContext";
//Page 2 of vendor registry
const RegisterVendor = (props) => {
  const { updateVendor } = useContext(AuthContext);
  const { values, handleChange, nextStep, previousStep, setUserInfo } = props;

  const proceed = (event) => {
    event.preventDefault();
    if (validate()) {
      console.log("Part 2 values", values);
      nextStep();
    }
  };

  const validate = () => {
    let business_nameError = "";
    let phoneError = "";
    let zipcodeError = "";

    if (!values.business_name) {
      business_nameError = "Business name required";
    }

    if (!values.phoneNumber) {
      phoneError = "Phone number required";
    }

    if (!values.zipcode) {
      zipcodeError = "Zipcode required";
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
          // placeholder='Enter your business name'
          value={values.business_name}
          onChange={handleChange}
        />
        <div className={registration.errorMessage}>
          {values.businessNameError}
        </div>

        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          name="phone"
          id="phoneNumber"
          // placeholder='Enter your phone number'
          value={values.phone_number}
          onChange={handleChange}
        />
        <div className={registration.errorMessage}>{values.phoneError}</div>

        <label htmlFor="address">Street Address</label>
        <input
          type="text"
          name="address"
          id="streetAddress"
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
              // placeholder='Enter your zipcode'
              value={values.zipcode}
              onChange={handleChange}
            />
            <div className={registration.errorMessage}>
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
            updateVendor(values);
          }}
        >
          Update Vendor Info
        </CustomButton>
      </form>
    </div>
  );
};

export default RegisterVendor;
