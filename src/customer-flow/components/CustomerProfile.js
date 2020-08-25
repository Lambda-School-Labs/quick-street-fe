import React, { useState, useEffect } from "react";
import axiosWithAuth from "../../utils/axiosWithAuth";
import "../../styles/css/customer/customer_profile.css";

//TESTING
import banner from "../../styles/scss/vendor/a_vendors_banner.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { Image, CloudinaryContext, Transformation } from "cloudinary-react";

const CustomerForm = ({ name, setName }) => {
  const [formData, setFormData] = useState({
    customer_name: "",
    address: "",
    phone_number: "",
    zip_code: "",
    public_id: "",
  });
  const [editing, setEditing] = useState(false);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
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
        setFormData(res.data);
        setNewImage("product-images/" + res.data.public_id);
      })
      .catch((err) => console.log(err));
  }, []);

  const myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: "quickstlabs",
      uploadPreset: "product-images",
      sources: [
        "local",
        "url",
        "camera",
        "image_search",
        "facebook",
        "dropbox",
        "instagram",
      ],
      showAdvancedOptions: true,
      cropping: true, // if true multiple must be false, set to false [set multiple to true] to upload multiple files
      multiple: false,
      defaultSource: "local",
      styles: {
        palette: {
          window: "#FFFFFF",
          sourceBg: "#00B2ED",
          windowBorder: "#E1F6FA",
          tabIcon: "#2B3335",
          inactiveTabIcon: "#555a5f",
          menuIcons: "#5B5F63",
          link: "#00769D",
          action: "#21B787",
          inProgress: "#00769D",
          complete: "#21B787",
          error: "#E92323",
          textDark: "#2B3335",
          textLight: "#FFFFFF",
        },
        fonts: {
          default: null,
          "'Poppins', sans-serif": {
            url: "https://fonts.googleapis.com/css?family=Poppins",
            active: true,
          },
        },
      },
    },

    async (error, result) => {
      if (!error && result && result.event === "success") {
        const banner_info = await result.info;
        const correctBannerData = banner_info.public_id.split("/", 2);
        axiosWithAuth()
          .put(`/customers/${formData.users_id}/profile-picture`, {
            public_id: correctBannerData[1],
          })
          .then((res) => {
            setNewImage("product-images/" + correctBannerData[1]);
            setFormData({ ...formData, public_id: correctBannerData[1] });
            // setPictureUpdate([]);
          })
          .catch((err) => {
            console.log("PUT VendorProfile.js Upload widget err", err);
          });
      }
    }
  );

  function editField() {
    setEditing(!editing);
  }

  const uploadPicture = (e) => {
    e.preventDefault();
    myWidget.open();
  };

  const [newImage, setNewImage] = useState(
    "product-images/" + formData.public_id
  );

  return (
    <div className="profile-wrapper" data-testid="customer-profile">
      <h1 className="user-title">{name}'s Profile</h1>
      {editing ? (
        <div className="form-wrapper">
          <div className="avatar-box">
            <CloudinaryContext cloudName="quickstlabs">
              <Image publicId={newImage}>
                <Transformation height="100" width="100" crop="fill" />
              </Image>
            </CloudinaryContext>

            <div className={banner.customer_avatar_upload}>
              <FontAwesomeIcon
                id={banner.upload}
                className={banner.icon}
                icon={faUpload}
                onClick={uploadPicture}
              />
            </div>
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
        <section>
          <div className="avatar-box float">
            <CloudinaryContext cloudName="quickstlabs">
              <Image publicId={newImage}>
                <Transformation height="100" width="100" crop="fill" />
              </Image>
            </CloudinaryContext>
            {/* <div className={banner.customer_avatar_upload}>
          <FontAwesomeIcon
          id={banner.upload}
          className={banner.icon}
          icon={faUpload}
          onClick={uploadPicture}/>
          </div> */}
          </div>
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
        </section>
      )}
    </div>
  );
};

export default CustomerForm;
