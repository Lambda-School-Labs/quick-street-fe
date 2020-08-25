import React, { useState, useEffect } from "react";
import axiosWithAuth from "../../utils/axiosWithAuth";
import Map from "../../components/shared/Map";
import { magGlass } from "../../assets/svgs/customerflow";
import { Image, CloudinaryContext, Transformation } from "cloudinary-react";
import "../../styles/css/customer/customer_search.css";
import { Link } from "react-router-dom";

const CustomerSearch = ({ defaultZip }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [finalZip, setFinalZip] = useState("");
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getSearchResults(searchQuery);
  };
  const getSearchResults = (zip) => {
    let newObj = { data: zip };
    axiosWithAuth()
      .post(`vendors/all/places`, newObj)
      .then((response) => {
        console.log("all results", response.data);
        setResults(response.data);
        if (response.data.length > 0) {
          setFinalZip(response.data[0].zipcode);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };
  return (
    <section className="search-page">
      <h1 id="search-title">Search</h1>

      <form>
        <div className="search-form">
          <label htmlFor="search">
            Search by City, Zipcode, or Vendor Name
          </label>
          <div className="input-box">
            <img src={magGlass} alt="magnifying glass" onClick={handleSubmit} />
            <input
              name="searchQuery"
              placeholder="search"
              onChange={handleChange}
              onKeyPress={onEnter}
              value={searchQuery}
            />
          </div>
        </div>
      </form>
      <div className="result-box">
        <div className="listings-box">
          {/* <h1>Results {results.length}</h1> */}
          {results.length === 0 ? (
            <h1>No vendors found...</h1>
          ) : (
            <div className="listings-function">
              {results.map((vendor) => {
                console.log("VENDOR INFOR", vendor);
                let newImage = "product-images/" + vendor.public_id;
                let cat;
                if (vendor.vendor_category) {
                  cat = `${vendor.vendor_category[0].toUpperCase()}${vendor.vendor_category.slice(
                    1
                  )}`;
                }

                return (
                  <Link to={`/customerHome/browse/${vendor.id}`}>
                    <div className="listing-card" key={vendor.id}>
                      {vendor.public_id ? (
                        <CloudinaryContext cloudName="quickstlabs">
                          <Image publicId={newImage}>
                            <Transformation
                              height="100"
                              width="100"
                              crop="fill"
                            />
                          </Image>
                        </CloudinaryContext>
                      ) : (
                        <img
                          className="vendor_banner_image"
                          src={
                            "https://images.unsplash.com/photo-1595228702420-b3740f7f9761?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3500&q=80"
                          }
                          alt="Banner Image"
                        ></img>
                      )}
                      <div id="vendor-info-box">
                        <h1>{vendor.business_name}</h1>
                        <p>{vendor.phone}</p>
                        <p>{vendor.zipcode}</p>
                        <p>{cat}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
        <div className="mapbox-container">
          {defaultZip ? (
            <Map
              className="map-search"
              zip={finalZip}
              setFinalZip={setFinalZip}
              vendors={results}
              target={defaultZip}
            />
          ) : (
            <div className="fake-map">
              <h1>Loading Map...</h1>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CustomerSearch;

/* Vendor Banner */
