import React, { useState } from "react";
import createDataContext from "./createDataContext";
import axiosWithAuth from "../utils/axiosWithAuth";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signup":
      return { errorMessage: "", token: action.payload };
    case "signout":
      return { token: null };
    case "change_message":
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

const checkIfCart = (customerId) => {
  console.log("checkIfCart function is being called");
  axiosWithAuth()
    .get(`/customers/${customerId}/cart`)
    .then((response) => {
      // console.log('Response when checking if a cart exists', response);
      window.location.href = "browse";
    })
    .catch((err) => {
      if (err.response.status === 404) {
        createCart(customerId);
      }
      console.log(err.response);
    });
};

const createCart = (customerId) => {
  console.log("createCart function is being called");
  axiosWithAuth()
    .post(`/customers/${customerId}/cart`)
    .then((response) => {
      // console.log('Response after creating a cart', response);
      window.location.href = "browse";
    })
    .catch((err) => {
      console.log(err.response);
    });
};

const signup = (dispatch) => async ({ email, password, role }) => {
  try {
    const response = await axiosWithAuth().post("/auth/registration", {
      email,
      password,
      role,
    });
    localStorage.setItem("token", response.data.token);
    // localStorage.setItem("user_id", response.data.id);
    localStorage.setItem("isVendor", response.data.user.isVendor);
    dispatch({ type: "signup", payload: response.data.token });
    if (response.status === 200 && role === "vendor") {
      console.log("response updating vendor info", response);
    } else if (response.status === 200 && role === "customer") {
      console.log("user is customer?");
      checkIfCart(response.data.id);
      window.location.href = "browse";

      // window.location.href = "/login";
      // window.location.href = `/profile/${response.data.id}`;
    }
  } catch (error) {
    console.log("Error while creating a user", error.response);
    dispatch({
      type: "add_error",
      payload: "something went wrong registering this user.",
    });
  }
};
const updateVendor = (dispatch) => async ({
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
    // localStorage.setItem("token", response.data.token);
    // localStorage.setItem("user_id", response.data.id);
    // localStorage.setItem("isVendor", response.data.isVendor);
    // dispatch({ type: "signup", payload: response.data.token });
    console.log("this is the response", response);
    if (response.status === 200) {
      console.log("response after creating a user", response);
      const userToken = localStorage.getItem('token')
      window.location.href = `/profile/${userToken}`;
    }
  } catch (error) {
    console.log("Error while creating a user", error.response);
    dispatch({
      type: "add_error",
      payload: "something went wrong updating this vendor account.",
    });
  }
};

const signin = (dispatch) => async ({ email, password }) => {
  try {
    const response = await axiosWithAuth().post("/auth/login", {
      email,
      password,
    });
    console.log(response);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user_id", response.data.id);
    localStorage.setItem("isVendor", response.data.isVendor);
    if ((response.status === 200) & response.data.isVendor) {
      console.log("You are logged in");
      window.location.href = `profile/${response.data.id}`;
    } else {
      console.log("user is customer?");
      checkIfCart(response.data.id);
      window.location.href = "browse";
    }
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: "add_error",
      payload: "There was an error logging you in. Try again later.",
    });
  }
};

const signout = (dispatch) => async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user_id");
  localStorage.removeItem("isVendor");
  localStorage.removeItem("lsid");
  dispatch({ type: "signout" });
};

const changeMessage = (dispatch) => () => {
  dispatch({
    type: "change_message",
    payload: "Hello This Is Me",
  });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, changeMessage, updateVendor },
  { token: "", errorMessage: "", message: "Hello Friend" }
);
