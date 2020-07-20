import React, { useState } from "react";
import axiosWithAuth from "../../utils/axiosWithAuth";
const CustomerForm = () => {
  const [formData, setFormData] = useState({
    customer_name: "",
    address: "",
    phone_number: "",
    zip_code: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("formData", formData);
    axiosWithAuth()
      .post("/customers/profile", formData)
      .then((res) => console.log("res from customer update", res))
      .catch((err) => console.log(err));
    setFormData({
      customer_name: "",
      address: "",
      phone_number: "",
      zip_code: "",
    });
  };
  return (
    <div>
      <h1> Customer Profile</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="customer_name">Name</label>
        <input
          name="customer_name"
          type="text"
          value={formData.customer_name}
          onChange={changeHandler}
        />
        <label htmlFor="address">Address</label>
        <input
          name="address"
          type="text"
          value={formData.address}
          onChange={changeHandler}
        />
        <label htmlFor="phone_number">Phone Number</label>
        <input
          name="phone_number"
          type="text"
          value={formData.phone_number}
          onChange={changeHandler}
        />
        <label htmlFor="zip_code">Zip Code</label>
        <input
          name="zip_code"
          type="text"
          value={formData.zip_code}
          onChange={changeHandler}
        />
        <button type="submit">Add Your Info</button>
      </form>
    </div>
  );
};

export default CustomerForm;
