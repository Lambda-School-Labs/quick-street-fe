import React, { useState } from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider as AuthProvider } from "../../contexts/AuthContext";
import { Provider as CartProvider } from "../../contexts/TestCartContext";
import { BrowserRouter as Router } from "react-router-dom";
import Register from "../../pages/Register";
import RegisterAll from "../../components/Register/RegisterAll";
import CustomButton from "../../components/shared/CustomButton";

describe("running tests on registry", () => {
  //arrange (render component and set up mock data)
  //act
  //assert
  const tree = (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Register>
            <RegisterAll />
          </Register>
        </CartProvider>
      </AuthProvider>
    </Router>
  );

  afterEach(cleanup);

  it(`renders the Component`, () => {
    const { getByText } = render(tree);
    expect(
      getByText("Create An Account With Quick Street")
    ).toBeInTheDocument();
  });
  it("Check that all fields and buttons exist", () => {
    const { getByTestId, getByLabelText } = render(tree);
    expect(getByLabelText("Email")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
    expect(getByTestId("email-input")).toBeInTheDocument();
    expect(getByTestId("password-input")).toBeInTheDocument();
    expect(getByTestId("cancel-button")).toBeInTheDocument();
    expect(getByTestId("register-button")).toBeInTheDocument();
  });

  it("Check the checkbox works", () => {
    const { getByLabelText } = render(tree);
    fireEvent(
      getByLabelText("Yes"),
      new MouseEvent("click", { bubbles: true })
    );
    expect(getByLabelText("Yes")).toBeChecked();
    expect(getByLabelText("Yes").checked).toBe(true);
  });

  //Maybe I don't need this here. Maybe I need this in the authcontext
  it("Signup function works", () => {
    const signup = jest.fn((val) => {
      state = val;
    });
    let state = "nothing";
    const values = "A new user";
    const { container } = render(
      <CustomButton onClick={signup(values)}>Register</CustomButton>
    );
    fireEvent.click(container.firstChild);
    expect(signup).toHaveBeenCalledTimes(1);
    expect(state).toBe("A new user");
  });

  it("Error handling- blank errors", () => {
    const { getByTestId } = render(tree);
    const register = getByTestId("register-button");
    fireEvent.click(register);
    expect(getByTestId("emailError")).toHaveTextContent("Invalid email");
    expect(getByTestId("passError")).toHaveTextContent("Password required");
    expect(getByTestId("roleError")).toHaveTextContent("Role required");
  });
  it("Error handling- dynamic errors", () => {
    const { getByTestId, getByLabelText } = render(tree);
    const email = getByTestId("email-input");
    fireEvent.change(email, { target: { value: "big@big.com" } });
    const password = getByTestId("password-input");
    fireEvent.change(password, { target: { value: "1234" } });
    fireEvent.click(getByLabelText("Yes"));
    const register = getByTestId("register-button");
    fireEvent.click(register);

    expect(getByTestId("emailError")).toHaveTextContent("");
    expect(getByTestId("passError")).toHaveTextContent(
      "Minimum password is 6 characters"
    );
    expect(getByTestId("roleError")).toHaveTextContent("");
  });
});
