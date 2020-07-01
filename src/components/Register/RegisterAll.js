import React, { useContext } from "react";
import { Link } from "react-router-dom";
import registration from "../../styles/scss/registration.module.scss";
import { CustomButton } from "../index";

//Adding auth context
import { Context as AuthContext } from "../../contexts/AuthContext";

//This is the first screen that we see. All of this is running through RegisterContext.js
const RegisterAll = (props) => {
  const { signup } = useContext(AuthContext);
  const { values, nextStep, handleChange, setUserInfo } = props;

  const proceed = () => {
    if (validate()) {
      // console.log(values);
      nextStep();
    }
  };

  const cancel = (event) => {
    event.preventDefault();
    props.history.push("/");
  };

  const validate = () => {
    let emailError = "";
    let passwordError = "";
    let roleError = "";

    if (!values.email.includes("@")) {
      emailError = "Invalid email";
    }

    if (values.password.length === 0) {
      passwordError = "Password required";
    }

    if (values.password.length < 6 && values.password) {
      passwordError = "Minimum password is 6 characters";
    }

    if (!values.role) {
      roleError = "Role required";
    }

    if (emailError || passwordError || roleError) {
      setUserInfo({
        ...values,
        emailError,
        passwordError,
        roleError,
      });
      return false;
    }

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
          // placeholder='Enter your email'
          value={values.email}
          onChange={handleChange}
        />
        <div className={registration.errorMessage}>{values.emailError}</div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          // placeholder='Please enter a password'
          value={values.password}
          onChange={handleChange}
        />
        <div className={registration.errorMessage}>{values.passwordError}</div>

        <div className={registration.vendorq_wrapper}>
          <p>Are you a vendor?</p>
          <div className={registration.radio_buttons_wrapper}>
            <label htmlFor="vendor">
              <input
                type="radio"
                name="role"
                value="vendor"
                checked={values.role === "vendor"}
                onChange={handleChange}
              />
              Yes
            </label>
            <label htmlFor="customer">
              <input
                type="radio"
                name="role"
                value="customer"
                checked={values.role === "customer"}
                onChange={handleChange}
              />
              No
            </label>
          </div>
        </div>

        <div className={registration.errorMessage}>{values.roleError}</div>

        <div className={registration.button_wrapper}>
          <CustomButton styleClass="green-border" onClick={cancel}>
            Cancel
          </CustomButton>
        </div>
        <div className={registration.button_wrapper}>
          <CustomButton
            styleClass="green-full"
            onClick={(e) => {
              e.preventDefault();
              signup(values);
              proceed();
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
