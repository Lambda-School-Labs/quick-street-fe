import React, { useState } from "react";
import axiosWithAuth from "../../utils/axiosWithAuth";
import Map from "../../components/shared/Map";
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
        console.log(response);
        setResults(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <section>
      <h1>Customer Search</h1>

      <form onSubmit={handleSubmit}>
        <div>
          {zipcode === "" && <p>Enter a location to start browsing</p>}
          {zipcode !== "" && <p>Your results for</p>}
          <input
            name="zipcode"
            placeholder="zip code"
            onChange={handleChange}
            value={zipcode}
          />
          <div>
            <button type="submit">Search</button>
          </div>
        </div>
      </form>
      <div>
        <Map
          zipcode={finalZip}
          setZipcode={setZipcode}
          vendors={results}
          height={300}
          width={1280}
        />
        <div>
          <h1>Results {results.length}</h1>
          {results.length === 0 ? (
            <h1>No vendors found...</h1>
          ) : (
            <div>
              {results.map((vendor) => (
                <div key={vendor.id}>
                  {/* <img
              className="vendor_banner_image"
              src={vendor.vendor_banner}
              alt="Banner Image"
            ></img> */}
                  <div>{vendor.business_name}</div>
                  {/* <div className={browse.category}>
              <p>{vendor.vendor_category}</p>
            </div> */}
                  <Link to={`/browse/${vendor.id}`}>View Vendor</Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CustomerSearch;
