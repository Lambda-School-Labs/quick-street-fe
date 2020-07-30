import React, { useState, useEffect, useContext } from "react";
import Map from "../../../shared/Map";
import axiosWithAuth from "../../../../utils/axiosWithAuth";
import { FavoritesContext } from "../../../../contexts/FavoritesContext";
// styling
import profile from "../../../../styles/scss/profile.module.scss";
// import { image } from '../../assets/rectangle.png';
import { Image, CloudinaryContext, Transformation } from "cloudinary-react";
const ViewAboutVendor = (props) => {
  // console.log("view about vendor", props.vendorId);
  const [isFavorite, setIsFavorite] = useState();
  const { favorites, setFavorites } = useContext(FavoritesContext);

  useEffect(() => {
    // console.log("customerPage favorites:", favorites);
    props.getVendor(props.vendorId);
    // console.log("this is the vendorId", props.vendorId);
    // console.log("favorites on the vendor page", favorites);
    checkFavorites();
  }, []); // removed [] dependency

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
      // console.log("is this firing");
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
      console.log("did false fire?");
    }
  };

  return (
    <>
      <div className={profile.banner_container}>
        <div className={profile.banner_wrapper}>
          <h1>{props.vendor.business_name}</h1>
          {isFavorite ? (
            <h1>Favorited</h1>
          ) : (
            <button onClick={() => favoriteVendor()}>Favorite</button>
          )}

          <CloudinaryContext cloudName="quickstlabs">
            <Image publicId={props.vendor.vendor_banner}>
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
            <p>{props.vendor.description}</p>
            <h1>Hours of Operation</h1>
            <p>{props.vendor.hours}</p>
            <h1>Contact</h1>
            <p>{props.vendor.phone}</p>
            <p>{props.vendor.email}</p>
          </div>
          <div className={profile.column_right}>
            <h1>Location</h1>
            <p>The vendor can be found at {props.vendor.zipcode} area</p>
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
