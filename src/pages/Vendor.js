// ** Vendor customer facing page ** //

import React from "react";
import {
  ViewAboutVendor,
  ViewVendorProducts,
  ViewVendorPosts,
  Footer,
  Nav,
} from "../components/index"; // removed ShoppingCartItems, Modal,
import "../styles/scss/OldcustomerFacingVendorProfile.scss";

// stlyes
import "../styles/scss/browse.module.scss";
import browse from "../styles/scss/browse.module.scss";

const Vendor = (props) => {
  const vendorId = props.location.pathname.match(/([^/]*$)/g)[0];
  return (
    <div data-testid="vendor-page">
      <ViewAboutVendor vendorId={vendorId} />
      <ViewVendorProducts vendorId={vendorId} />
      <ViewVendorPosts vendorId={vendorId} />
      {/* <button onClick={() => props.history.goBack()}>Back</button> */}
    </div>
  );
};

export default Vendor;
