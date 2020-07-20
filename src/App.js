import React from "react"; // removed useState
import { Route, Switch, Router } from "react-router-dom";
import "./styles/scss/index.scss";
// import UserContext from './contexts/UserContext';

// Context
import { Provider as AuthProvider } from "./contexts/AuthContext";
import { Provider as CartProvider } from "./contexts/TestCartContext";

import OrderConfirmation from "./components/OrderReview/OrderConfirmation";
import {
  Register, // ** Register
  Login, // ** Login
  Vendor, // ** Browsing Vendor Page
  Browse, // ** Browsing page (Map, Search)
  Landing, // ** Home Page
  ProfilePage, //** Vendors Editing Page */
  Styling, // ** Styling Template */
  Dashboard, // ** Dashboard Page **/
  OrderReview, // ** Order Review Page **/
} from "./pages/index";
import CustomerPage from "./customer-flow/components/CustomerPage";
import CustomerOrders from "./customer-flow/components/CustomerOrders";

const App = () => {
  return (
    <div>
      <Route path="/orderreview/:id" render={OrderReview} />
      <Route path="/orderconfirmation" component={OrderConfirmation} />
      <Route path="/styling" component={Styling} />
      <Route exact path="/" component={Landing} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Switch>
        <Route path="/profile" component={ProfilePage} />
        <Route path="/customerHome" component={CustomerPage} />
        <Route path="/orders/me" component={CustomerOrders} />
        <Route path="/browse/:id" component={Vendor} />
        <Route path="/browse" component={Browse} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
};

export default () => {
  return (
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  );
};
