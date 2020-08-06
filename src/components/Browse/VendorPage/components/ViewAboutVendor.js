import React, { useState, useEffect, useContext } from "react";
import Map from "../../../shared/Map";
import { Link } from "react-router-dom";
import axiosWithAuth from "../../../../utils/axiosWithAuth";
import { FavoritesContext } from "../../../../contexts/FavoritesContext";
// styling
// import profile from "../../../../styles/scss/profile.module.scss";
// import { image } from '../../assets/rectangle.png';
import "../../../../styles/css/customer/customer_view_profile.css";
import {
  Image,
  CloudinaryContext,
  Transformation,
  Placeholder,
} from "cloudinary-react";
import {
  favorite,
  favEmpty,
  arrow,
} from "../../../../assets/svgs/customerflow";
const ViewAboutVendor = (props) => {
  // console.log("view about vendor", props.vendorId);
  const [isFavorite, setIsFavorite] = useState();
  const { favorites, setFavorites } = useContext(FavoritesContext);

  useEffect(() => {
    props.getVendor(props.vendorId);
    checkFavorites();
  }, []);

  const favoriteVendor = () => {
    // let vendor = { vendor_id: props.vendorId };
    let vendor = { vendor_id: props.vendorId };
    axiosWithAuth()
      .post("/customers/favorites/add", vendor)
      .then((response) => {
        console.log("successfully favorited the vendor page", response);
        setFavorites([...favorites, props.vendorId]);
        setIsFavorite(true);
      })
      .catch((error) => {
        console.log(error);
        console.log(vendor);
      });
  };
  const checkFavorites = () => {
    // console.log("this is the vendor id", props.vendorId);
    if (favorites.includes(+props.vendorId)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
      console.log("did false fire?");
    }
  };
  let newImage = "product-images/" + props.vendor.public_id;
  console.log("image id", newImage);
  return (
    <>
      <div className="view-vendor-wrapper">
        <div className="vendor-banner">
          <h1>{props.vendor.business_name}</h1>
          <p>{props.vendor.description}</p>
        </div>
        <div className="vendor-cloud-img">
          {props.vendor.public_id ? (
            <CloudinaryContext cloudName="quickstlabs">
              <Image loading="lazy" publicId={newImage}>
                <Placeholder type="pixelate" />
                <Transformation
                  gravity="center"
                  dpr="auto"
                  responsive
                  width="1000"
                  responsiveUseBreakpoints="true"
                  height="300"
                />
              </Image>
            </CloudinaryContext>
          ) : (
            <img
              src="https://images.unsplash.com/photo-1506484381205-f7945653044d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3150&q=80"
              alt="market with fruit and veg"
            />
          )}
        </div>
      </div>
      <div className="vendor-about">
        <div className="add-favs">
          {isFavorite ? (
            <img src={favorite} alt="filled heart" />
          ) : (
            <button onClick={() => favoriteVendor()}>
              <img src={favEmpty} alt="empty heart" />
            </button>
          )}
          <div className="vendor-back-arrow">
            <Link to="/customerHome/search">
              <img src={arrow} alt="backwards arrow" />
              back to search results
            </Link>
          </div>
        </div>
        <h1>Hours of Operation</h1>
        <p>{props.vendor.hours}</p>
        <h1>Contact</h1>
        <p>{props.vendor.phone}</p>
        <p>{props.vendor.email}</p>
      </div>
      <div>
        <h1>Location</h1>
        <p>The vendor can be found at {props.vendor.zipcode} area</p>
        {/* <Map
              zipcode={vendor.zipcode}
              width={"90vw"}
              height="50vh"
              target={vendor.zipcode}
            /> */}
      </div>
    </>
  );
};

export default ViewAboutVendor;
