import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import axios from "axios";
import axiosWithAuth from "../../utils/axiosWithAuth";

import "../../styles/css/map.css";

const Map = ({ zipcode, setZipcode }) => {
  const [vendors, setVendors] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: 40.7622125,
    longitude: -111.9068791,
    width: "100%",
    height: "400px",
    zoom: 10,
  });

  const apiKey =
    "pk.eyJ1IjoiYnNoZXJ3b29kOSIsImEiOiJja2JrYWJhbDEwbWR4MnVxbGdnODV4NHBqIn0.MUDew7rv2_CqYXAPrkBOgA";

  const getGeocode = () => {
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${zipcode}.json?access_token=${apiKey}`
      )
      .then((response) => {
        console.log("mapbox response", response);
        setViewport({
          ...viewport,
          latitude: response.data.features[0].center[1],
          longitude: response.data.features[0].center[0],
        });
        // console.log(response.data.results[0].geometry.location);
      });
  };

  useEffect(() => {
    console.log("zipcode", zipcode);
    if (zipcode !== "") {
      getGeocode();
    }
  }, [zipcode]);

  useEffect(() => {
    axiosWithAuth()
      .get("/vendors/all")
      .then((res) => setVendors(res.data))
      .catch((err) => console.log(err));
  }, []);
  // removed , [mapDetails] dependency
  return (
    <div style={{ paddingTop: "20px" }}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={apiKey}
        mapStyle={"mapbox://styles/bsherwood9/ckbkauyij0kw41it2u7y8cbf2"}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        markers here
      </ReactMapGL>
    </div>
  );
};

export default Map;
