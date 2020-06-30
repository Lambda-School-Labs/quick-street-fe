import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import axios from "axios";
import axiosWithAuth from "../../utils/axiosWithAuth";

import "../../styles/css/map.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const Map = ({ zipcode, setZipcode, width, height, target }) => {
  const [vendors, setVendors] = useState([]);
  const [tag, setTag] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 40.7622125,
    longitude: -111.9068791,
    width: width,
    height: height,
    zoom: 10,
  });
  const [vendorInfo, setVendorInfo] = useState([]);

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
          zoom: 8,
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

  useEffect(() => {
    vendors.map((item) => {
      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${item.city}.json?access_token=${apiKey}`
        )
        .then((response) => {
          console.log("mapbox response", response);
          vendorInfo.push({
            id: Date.now(),
            latitude: response.data.features[0].center[1],
            longitude: response.data.features[0].center[0],
          });
        });
    });
  }, [vendors]);

  if (target) {
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${target}.json?access_token=${apiKey}`
      )
      .then((response) => {
        console.log("mapbox response", response);
        setTag({
          id: Date.now(),
          latitude: response.data.features[0].center[1],
          longitude: response.data.features[0].center[0],
        });
      });
  }

  useEffect(() => {
    console.log("vendors", vendors);
    console.log("vendorInfo", vendorInfo);
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
        {tag ? (
          <Marker
            options
            key={tag.id}
            latitude={tag.latitude}
            longitude={tag.longitude}
          >
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              size="3x"
              style={{ color: "red" }}
            />
          </Marker>
        ) : (
          vendorInfo.map((item) => (
            <Marker
              options
              key={item.id}
              latitude={item.latitude}
              longitude={item.longitude}
            >
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                size="3x"
                style={{ color: "red" }}
              />
            </Marker>
          ))
        )}
      </ReactMapGL>
    </div>
  );
};

export default Map;
