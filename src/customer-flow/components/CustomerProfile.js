import React, { useState, useEffect } from "react";
import axiosWithAuth from "../../utils/axiosWithAuth";
import "../../styles/css/customer/customer_profile.css";
const CustomerForm = ({ name, setName }) => {
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
        setName(res.data.customer_name);
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
    <div className="profile-wrapper">
      <h1 className="user-title">{name}'s Profile</h1>
      {editing ? (
        <div className="form-wrapper">
          <div className="avatar-box">
            <img
              src="https://images.unsplash.com/photo-1500832333538-837287aad2b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1834&q=80"
              alt="moustached man in black and white"
            />
          </div>
          <form className="customer-form" onSubmit={submitHandler}>
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
            <div className="button-drawer">
              <button id="cancel-btn" onClick={editField}>
                Cancel
              </button>
              <button id="sub-btn" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="customer-info">
          <p>Name</p>
          <h3>{formData.customer_name}</h3>
          <p>Address</p>
          <h3>{formData.address}</h3>
          <p>Phone Number</p>
          <h3>{formData.phone_number}</h3>
          <p>Zip Code</p>
          <h3>{formData.zip_code}</h3>
          <div className="edit-btn-box">
            <button onClick={editField}>Edit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerForm;
