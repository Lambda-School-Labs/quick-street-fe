import React, { useState } from "react";
import axiosWithAuth from "../../utils/axiosWithAuth";
import Map from "../../components/shared/Map";
import { magGlass } from "../../assets/svgs/customerflow";
import "../../styles/css/customer/customer_search.css";
import { Link } from "react-router-dom";

const CustomerSearch = () => {
  const [zipcode, setZipcode] = useState("");
  const [results, setResults] = useState([]);
  const [finalZip, setFinalZip] = useState("");
  const handleChange = (e) => {
    setZipcode(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFinalZip(zipcode);
    getSearchResults(zipcode);
  };

  const getSearchResults = (zip) => {
    let newObj = { data: zip };
    axiosWithAuth()
      .post(`vendors/all/places`, newObj)
      .then((response) => {
        console.log("these are results.", response);
        setResults(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <section className="search-page">
      <h1>Search</h1>

      <form>
        <div className="search-form">
          <label htmlFor="search">
            Search by City, Zipcode, or Vendor Name
          </label>
          <div className="input-box">
            <img src={magGlass} alt="magnifying glass" onClick={handleSubmit} />
            <input
              name="search"
              placeholder="zip code"
              onChange={handleChange}
              value={zipcode}
            />
          </div>
        </div>
      </form>
      <div className="result-box">
        <div className="listings-box">
          <h1>Results {results.length}</h1>
          {results.length === 0 ? (
            <h1>No vendors found...</h1>
          ) : (
            <div className="listings-function">
              {results.map((vendor) => {
                let cat;
                if (vendor.vendor_category) {
                  cat = `${vendor.vendor_category[0].toUpperCase()}${vendor.vendor_category.slice(
                    1
                  )}`;
                }

                return (
                  <Link to={`/browse/${vendor.id}`}>
                    <div className="listing-card" key={vendor.id}>
                      <img
                        className="vendor_banner_image"
                        src={
                          "https://images.unsplash.com/photo-1595228702420-b3740f7f9761?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3500&q=80"
                        }
                        alt="Banner Image"
                      ></img>
                      <div>
                        <h1>{vendor.business_name}</h1>
                        {/* <div className={browse.category}>
              <p>{vendor.vendor_category}</p>
            </div> */}
                        <h2>{vendor.phone}</h2>
                        <h2>{vendor.zipcode}</h2>
                        <h2>{cat}</h2>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
        {/* <Map
          className="map-search"
          zipcode={finalZip}
          setZipcode={setZipcode}
          vendors={results}
          height={500}
          width={"50%"}
        /> */}
      </div>
    </section>
  );
};

export default CustomerSearch;

/* Vendor Banner */
