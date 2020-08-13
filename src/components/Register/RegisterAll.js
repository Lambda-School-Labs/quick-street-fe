import React, { useState } from "react";
import { Link } from "react-router-dom";
import registration from "../../styles/scss/registration.module.scss";
import { CustomButton } from "../index";
import axiosWithAuth from "../../utils/axiosWithAuth";

//This is the first screen that we see. All of this is running through RegisterContext.js
const RegisterAll = (props) => {
  const [userValues, setUserValues] = useState({
    email: "",
    password: "",
    isVendor: false,
  });
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
    roleError: "",
  });
  const signup = async (data) => {
    try {
      const response = await axiosWithAuth().post("/auth/registration", data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user_id", response.data.id);
      localStorage.setItem("isVendor", response.data.user.isVendor);
      console.log("response updating vendor info", response);
      if (response.status === 200 && response.data.user.isVendor === "true") {
        props.setVendorCheck(true);
        props.nextStep();
      } else if (
        response.status === 200 &&
        response.data.user.isVendor == false
      ) {
        console.log("user is customer?");
        props.nextStep();
        // checkIfCart(response.data.id);
        // window.location.href = "browse";
      }
    } catch (error) {
      console.log("Error while creating a user", error.response);
    }
  };

  const cancel = (event) => {
    event.preventDefault();
    props.history.push("/");
  };

  const handleChange = (e) => {
    setUserValues({
      ...userValues,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let emailError = "";
    let passwordError = "";
    let roleError = "";
    if (!userValues.email.includes("@")) {
      emailError = "Invalid email";
    }
    if (userValues.password.length === 0) {
      passwordError = "Password required";
    }
    if (userValues.password.length < 6 && userValues.password) {
      passwordError = "Minimum password is 6 characters";
    }
    if (!userValues.isVendor) {
      roleError = "Role required";
    }
    if (emailError || passwordError || roleError) {
      setErrors({
        ...errors,
        emailError,
        passwordError,
        roleError,
      });
      return false;
    }
    setErrors({
      ...errors,
      emailError,
      passwordError,
      roleError,
    });
    return true;
  };

  return (
    //bringing in our module
    <div className={registration.wrapper}>
      <h1>Create An Account With Quick Street</h1>
      <p>
        Already have an account?{" "}
        <Link className="link" to="/login">
          Log In
        </Link>
      </p>
      <form className={registration.form}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          data-testid="email-input"
          // placeholder='Enter your email'
          value={userValues.email}
          onChange={handleChange}
        />
        <div data-testid="emailError" className={registration.errorMessage}>
          {errors.emailError}
        </div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          data-testid="password-input"
          // placeholder='Please enter a password'
          value={userValues.password}
          onChange={handleChange}
        />
        <div data-testid="passError" className={registration.errorMessage}>
          {errors.passwordError}
        </div>

        <div className={registration.vendorq_wrapper}>
          <p>Are you a vendor?</p>
          <div className={registration.radio_buttons_wrapper}>
            <label htmlFor="vendor">
              <input
                type="radio"
                name="isVendor"
                value="true"
                onChange={handleChange}
              />
              Yes
            </label>
            <label htmlFor="customer">
              <input
                type="radio"
                name="isVendor"
                value="false"
                onChange={handleChange}
              />
              No
            </label>
          </div>
        </div>

        <div data-testid="roleError" className={registration.errorMessage}>
          {errors.roleError}
        </div>

        <div className={registration.button_wrapper}>
          <CustomButton
            styleClass="green-border"
            data-testid="cancel-button"
            onClick={cancel}
          >
            Cancel
          </CustomButton>
        </div>
        <div className={registration.button_wrapper}>
          <CustomButton
            data-testid="register-button"
            styleClass="green-full"
            onClick={(e) => {
              e.preventDefault();
              if (validate()) {
                console.log("uservalues", userValues);
                signup(userValues);
              }
            }}
          >
            Register
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default RegisterAll;
