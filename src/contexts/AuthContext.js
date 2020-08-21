import React, { useState } from "react";
import createDataContext from "./createDataContext";
import axiosWithAuth from "../utils/axiosWithAuth";

const authReducer = (state, action) => {
  switch (action.type) {
    case "error":
      return {
        ...state,
        errorMessage: "There was an error logging in. Try again.",
      };
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
  axiosWithAuth()
    .get(`/customers/${customerId}/cart`)
    .then((response) => {
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
  axiosWithAuth()
    .post(`/customers/${customerId}/cart`)
    .then((response) => {
      window.location.href = "browse";
    })
    .catch((err) => {
      console.log(err.response);
    });
};

const signin = (dispatch) => async ({ email, password }) => {
  try {
    const response = await axiosWithAuth().post("/auth/login", {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user_id", response.data.id);
    localStorage.setItem("isVendor", response.data.isVendor);
    if ((response.status === 200) & response.data.isVendor) {
      window.location.href = `profile/${response.data.id}`;
    } else {
      checkIfCart(response.data.id);
      window.location.href = "customerHome/search";
    }
  } catch (error) {
    dispatch({ type: "error" });
    console.log(error.response);
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
  { signin, signout, changeMessage },
  { token: "", errorMessage: "", message: "Hello Friend" }
);
