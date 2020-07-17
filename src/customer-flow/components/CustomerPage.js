import React from "react";
import CustomerProfile from "../components/CustomerProfile";
import customerProfile from "../../styles/css/customer/customer_profile_page.css";
import {
  dashboard_icon,
  profile_icon,
  daily,
  orders,
  logo,
  logout,
} from "../../assets/svgs/customerflow";
const CustomerPage = () => {
  return (
    <div className="page-wrapper">
      <div className="side-nav">
        <img src={logo} alt="logo" />
        <ul>
          <li>
            <img src={dashboard_icon} alt="dashboard icon" />
            Dashboard
          </li>
          <li>
            <img src={profile_icon} alt="dashboard icon" />
            Profile
          </li>
          <li>
            <img src={orders} alt="orders icon" />
            Orders
          </li>
          <li>
            <img src={daily} alt="daily icon" />
            Favorites
          </li>
        </ul>
        <img src={logout} alt="logout img" />
        <h3>Log out</h3>
      </div>
      <div className="component-section">
        <CustomerProfile />
      </div>
    </div>
  );
};

export default CustomerPage;
