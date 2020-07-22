import React, { useState, useEffect } from "react";
import Map from "../../../shared/Map";
import axiosWithAuth from "../../../../utils/axiosWithAuth";
// styling
import profile from "../../../../styles/scss/profile.module.scss";
// import { image } from '../../assets/rectangle.png';
import { Image, CloudinaryContext, Transformation } from "cloudinary-react";
const ViewAboutVendor = (props) => {
  console.log("view about vendor", props.vendorId);
  const [vendor, setVendor] = useState({});

  const getVendor = (id) => {
    axiosWithAuth()
      .get(`/vendors/${id}`)
      .then((response) => {
        console.log("view vendor about", response);
        setVendor(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  useEffect(() => {
    getVendor(props.vendorId);
    console.log("this is the vendorId", props.vendorId);
  }, []); // removed [] dependency

  const favoriteVendor = () => {
    // let vendor = { vendor_id: props.vendorId };
    let vendor = { vendor_id: props.vendorId };
    axiosWithAuth()
      .post("/customers/favorites/add", vendor)
      .then((response) => {
        console.log("successfully favorited the vendor page", response);
      })
      .catch((error) => {
        console.log(error);
        console.log(vendor);
      });
  };
  return (
    <>
      <div className={profile.banner_container}>
        <div className={profile.banner_wrapper}>
          <h1>{vendor.business_name}</h1>
          <button onClick={() => favoriteVendor()}>Favorite</button>
          <CloudinaryContext cloudName="quickstlabs">
            <Image publicId={vendor.vendor_banner}>
              <Transformation
                gravity="center"
                height="318"
                width="1062"
                crop="fill"
              />
            </Image>
          </CloudinaryContext>
        </div>
      </div>
      <div className={profile.about_container}>
        <div className={profile.about_wrapper}>
          <div className={profile.column_left}>
            <h1>About Us</h1>
            <p>{vendor.description}</p>
            <h1>Hours of Operation</h1>
            <p>{vendor.hours}</p>
            <h1>Contact</h1>
            <p>{vendor.phone}</p>
            <p>{vendor.email}</p>
          </div>
          <div className={profile.column_right}>
            <h1>Location</h1>
            <p>The vendor can be found at {vendor.zipcode} area</p>
            {/* <Map
              zipcode={vendor.zipcode}
              width={"90vw"}
              height="50vh"
              target={vendor.zipcode}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAboutVendor;
