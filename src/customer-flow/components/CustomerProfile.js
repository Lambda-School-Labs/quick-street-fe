import React, { useState } from "react";
const CustomerProfile = () => {
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
    console.log("Submitted Customer profile");
    console.log("formData", formData);
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default CustomerProfile;
