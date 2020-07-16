import React, { useState, useEffect } from "react";
import axiosWithAuth from "../../utils/axiosWithAuth";
const CustomerForm = () => {
  const [formData, setFormData] = useState({
    customer_name: "",
    address: "",
    phone_number: "",
    zip_code: "",
  });
  const [editing, setEditing] = useState(false);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("formData", formData);
    axiosWithAuth()
      .put("/customers/profile/update", formData)
      .then((res) => {
        console.log("res from customer update", res);
        editField();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axiosWithAuth()
      .get("/customers/me")
      .then((res) => {
        console.log("res from customer update", res);
        setFormData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function editField() {
    setEditing(!editing);
  }

  return (
    <div>
      <h1> Your Profile</h1>
      {editing ? (
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
          <button onClick={editField}>Cancel</button>
        </form>
      ) : (
        <div onClick={editField}>
          <h3>{formData.customer_name}</h3>
          <h3>{formData.address}</h3>
          <h3>{formData.phone_number}</h3>
          <h3>{formData.zip_code}</h3>
        </div>
      )}
    </div>
  );
};

export default CustomerForm;
