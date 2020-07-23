import React, { useContext, useEffect, useState } from "react";
import axiosWithAuth from "../../utils/axiosWithAuth";
import CustomerProfile from "../components/CustomerProfile";
import CustomerOrders from "../components/CustomerOrders";
import CustomerFavorites from "../components/CustomerFavorites";
import CustomerSearch from "./CustomerSearch";
import { FavoritesContext } from "../../contexts/FavoritesContext";
import "../../styles/css/customer/customer_profile_page.css";
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
} from "../../assets/svgs/customerflow";



const CustomerPage = () => {
  const {favorites, setFavorites} = useContext(FavoritesContext);
  const { signout } = useContext(AuthContext);
  const [name, setName] = useState("");
  useEffect(() => {
    axiosWithAuth()
      .get("/customers/me")
      .then((res) => setName(res.data.customer_name))
      .catch((err) => console.log(err));
      getFavorites();
  }, []);

  const createArr = () => {
  favorites.forEach(e => {
    setFavorites([...favorites, e])
  })
  }
 // favorites ? createArr() : null


  const getFavorites = () => {
    axiosWithAuth().get("/auth/favorites")
      .then(
        res => {
          setFavorites(res.data)
        console.log("This should be favorites:", favorites)}
      )
      .catch(
        err =>
        console.log(err)
      )
  }

  return (
    <div className="page-wrapper">
      <div className="side-nav">
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
      <div className="component-section">
        <Switch>
          <Route exact path="/customerHome">
            <h1 className="welcome-banner">
              Welcome to the Customer Dashboard, {name}.
            </h1>
          </Route>
          <Route path="/customerHome/profile">
            <CustomerProfile name={name} setName={setName} />
          </Route>
          <Route path="/customerHome/orders/me">
            <CustomerOrders name={name} />
          </Route>
          <Route path="/customerHome/favorites/me">
            <CustomerFavorites name={name} />
          </Route>
          <Route path="/customerHome/search">
            <CustomerSearch />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default CustomerPage;
