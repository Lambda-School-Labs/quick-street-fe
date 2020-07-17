import React, { useContext } from "react";
import CustomerProfile from "../components/CustomerProfile";
import customerProfile from "../../styles/css/customer/customer_profile_page.css";
import { Context as AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import {
  dashboard_icon,
  profile_icon,
  daily,
  orders,
  logo,
  logout,
} from "../../assets/svgs/customerflow";
const CustomerPage = () => {
  const { signout } = useContext(AuthContext);

  return (
    <div className="page-wrapper">
      <div className="side-nav">
        <div className="logo-box">
          <img src={logo} alt="logo" />
        </div>
        <ul>
          <li>
            <Link to="/customerHome">
              <p>
                <img src={dashboard_icon} alt="dashboard icon" />
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link to="/customerHome">
              <p>
                <img src={profile_icon} alt="dashboard icon" />
                Profile
              </p>
            </Link>
          </li>
          <li>
            <Link to="/orders">
              <p>
                <img src={orders} alt="orders icon" />
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link to="/favorites">
              <p>
                <img src={daily} alt="daily icon" />
                Favorites
              </p>
            </Link>
          </li>
        </ul>
        <div className="logout-btn">
          <Link to="/" onClick={() => signout()}>
            <p>
              <img src={logout} alt="logout img" />
              Log out
            </p>
          </Link>
        </div>
      </div>
      <div className="component-section">
        <CustomerProfile />
      </div>
    </div>
  );
};

export default CustomerPage;
