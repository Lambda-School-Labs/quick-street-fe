// ** Vendor customer facing page ** //

import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import {
  ViewAboutVendor,
  ViewVendorProducts,
  ViewVendorPosts,
} from "../components/index"; // removed ShoppingCartItems, Modal,
import "../styles/scss/OldcustomerFacingVendorProfile.scss";

// stlyes
import "../styles/scss/browse.module.scss";
import browse from "../styles/scss/browse.module.scss";

const Vendor = (props) => {
  const vendorId = props.location.pathname.match(/([^/]*$)/g)[0];
  const [vendor, setVendor] = useState({});
  const getVendor = (id) => {
    axiosWithAuth()
      .get(`/vendors/${id}`)
      .then((response) => {
        setVendor(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div data-testid="vendor-page">
      <ViewAboutVendor
        getVendor={getVendor}
        vendor={vendor}
        vendorId={vendorId}
      />
      <ViewVendorProducts vendor={vendor} vendorId={vendorId} />
      {/* <ViewVendorPosts vendorId={vendorId} /> */}
      {/* <button onClick={() => props.history.goBack()}>Back</button> */}
    </div>
  );
};

export default Vendor;
