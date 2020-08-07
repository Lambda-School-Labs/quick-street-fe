import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";
import { Context as AuthContext } from "../contexts/AuthContext";

// styles
import login from "../styles/scss/login.module.scss";

// components
import { CustomButton } from "../components/index";
// import Image from "../assets/images/Image";

const Login = (props) => {
  const { state, signin } = useContext(AuthContext); // removed state, signout
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState({
    emailError: "",
    passwordError: "",
  });

  //creating validation function
  const validateLogin = () => {
    let emailError = "";
    let passwordError = "";

    if (!email.includes("@")) {
      emailError = "Invalid email";
    }

    if (password.length === 0) {
      passwordError = "Password required";
    }

    if (password.length < 6 && password) {
      passwordError = "Minimum password is 6 characters";
    }

    if (emailError || passwordError) {
      setValid({
        ...valid,
        emailError,
        passwordError,
      });
      return false;
    } else {
      setValid({
        ...valid,
        emailError,
        passwordError,
      });
      return true;
    }
  };

  return (
    <div className={login.container} data-testid="login-wrapper">
      <div className={login.wrapper}>
        <h1>Welcome Back!</h1>
        <h1>Login</h1>
        <div className={login.form}>
          <div className={login.form_wrapper}>
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className={login.errorMessage}>{valid.emailError}</p>
          </div>
          <div className={login.form_wrapper}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={(e) => validateLogin()}
            />
            <p className={login.errorMessage}>{valid.passwordError}</p>
          </div>
          {state.errorMessage ? <h3>{state.errorMessage}</h3> : null}

          <div className={login.button_wrapper}>
            <CustomButton
              onClick={() => {
                if (validateLogin()) {
                  signin({ email, password });
                }
              }}
              styleClass="green-full"
            >
              Login
            </CustomButton>
          </div>
          <p>
            Don't have an account?
            <Link className={login.link} to="/register">
              Create One
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
