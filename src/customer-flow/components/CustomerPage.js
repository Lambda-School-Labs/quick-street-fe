import React, { useContext, useEffect, useState } from "react";
import axiosWithAuth from "../../utils/axiosWithAuth";
import CustomerProfile from "../components/CustomerProfile";
import CustomerOrders from "../components/CustomerOrders";
import CustomerFavorites from "../components/CustomerFavorites";
import CustomerSearch from "./CustomerSearch";
import ShoppingSlidein from "./ShoppingSlidein";
import { Vendor } from "../../pages/index";
import { FavoritesContext } from "../../contexts/FavoritesContext";
import "../../styles/css/customer/customer_page.css";
import { CartContext } from "../../contexts/CartContext";
import { Context as AuthContext } from "../../contexts/AuthContext";
import { Link, Route, Switch } from "react-router-dom";
import {
  dashboard_icon,
  profile_icon,
  favorite,
  search,
  orders,
  logo,
  logout,
  cartIcon,
} from "../../assets/svgs/customerflow";

const CustomerPage = (props) => {
  const { cart } = useContext(CartContext);
  const [defaultZip, setDefaultZip] = useState("");
  const { favorites, setFavorites } = useContext(FavoritesContext);
  const { signout } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    axiosWithAuth()
      .get("/customers/me")
      .then((res) => {
        setDefaultZip(res.data.zip_code);
        setName(res.data.customer_name);
      })
      .catch((err) => console.log(err));
    getFavorites();
  }, [name]);
  const getFavorites = () => {
    axiosWithAuth()
      .get("/auth/favorites")
      .then((res) => {
        setFavorites(res.data.map((item) => item.id));
      })
      .catch((err) => console.log(err));
  };

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };
  return (
    <div className="page-wrapper" data-testid="page">
      {cart.length > 0 ? (
        <p className="notification" onClick={handleSidebar}>
          {cart.length}
        </p>
      ) : null}
      <img
        src={cartIcon}
        alt="shopping cart icon"
        className="cart-icon"
        onClick={handleSidebar}
      />
      <div
        className={sidebar ? "cart-wrapper cart-on" : "cart-wrapper cart-off"}
      >
        <ShoppingSlidein handleSidebar={handleSidebar} />
      </div>

      <div class="hamburger-menu">
        <button
          className={mobile ? null : "menu-btn"}
          onClick={() => setMobile(!mobile)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <button
          onClick={() => setMobile(!mobile)}
          className={mobile ? "open" : "closed"}
        >
          X
        </button>
      </div>
      <div className={mobile ? "mobile-nav side-nav" : "side-nav"}>
        <div className="logo-box">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
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
            <Link to="/customerHome/profile">
              <p>
                <img src={profile_icon} alt="dashboard icon" />
                Profile
              </p>
            </Link>
          </li>
          <li>
            <Link to="/customerHome/orders/me">
              <p>
                <img src={orders} alt="orders icon" />
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link to="/customerHome/favorites/me">
              <p>
                <img src={favorite} alt="daily icon" />
                Favorites
              </p>
            </Link>
          </li>
          <li>
            <Link to="/customerHome/search">
              <p>
                <img src={search} alt="magnifying glass icon" />
                Search
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
      <div className="component-section" data-testid="component-section">
        <Switch>
          <Route exact path="/customerHome">
            <h1 className="welcome-banner">
              Welcome to the Customer Dashboard, {name}.
            </h1>
          </Route>
          <Route path="/customerHome/profile">
            <CustomerProfile
              name={name}
              setName={setName}
              setDefaultZip={setDefaultZip}
            />
          </Route>
          <Route path="/customerHome/orders/me">
            <CustomerOrders name={name} />
          </Route>
          <Route path="/customerHome/favorites/me">
            <CustomerFavorites name={name} />
          </Route>
          <Route path="/customerHome/search">
            <CustomerSearch
              defaultZip={defaultZip}
              setDefaultZip={setDefaultZip}
            />
          </Route>
          <Route path="/customerHome/browse/:id">
            <Vendor {...props} />
          </Route>
        </Switch>
        <p id="copyright">&copy; 2020 Market Avenue</p>
      </div>
    </div>
  );
};

export default CustomerPage;
