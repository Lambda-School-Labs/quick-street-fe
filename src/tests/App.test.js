import React from "react";

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";
import { BrowserRouter as Router } from "react-router-dom";
test(`loads and display h1`, () => {
  const tree = (
    <Router>
      <App />
    </Router>
  );

  const { findByText } = render(tree);
  findByText(
    /Finally , A Way For Vendors and Lovers of Food to Come Together in Harmony/i
  );
});
