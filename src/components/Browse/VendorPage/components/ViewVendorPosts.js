import React, { useState, useEffect } from "react";

import axiosWithAuth from "../../../../utils/axiosWithAuth";

// styling
import profile from "../../../../styles/scss/profile.module.scss";
// import "../../../../styles/css/customer/customer_view_profile.css";

const ViewVendorPosts = (props) => {
  const [vendorPost, setVendorPost] = useState([]);

  const changeDateFormat = (date) => {
    if (!date) {
      return "N/A";
    } else {
      let resultingDate = "";
      const yearMonthArray = date.split("-");
      const dayArray = yearMonthArray[2].split("T");
      resultingDate =
        yearMonthArray[1] + "/" + dayArray[0] + "/" + yearMonthArray[0];
      return resultingDate;
    }
  };

  const getVendorPosts = (id) => {
    axiosWithAuth()
      .get(`/vendors/${id}/posts`)
      .then((response) => {
        setVendorPost([...vendorPost, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getVendorPosts(props.vendorId);
  }, []);

  return (
    <div className={profile.bulletin_container}>
      <div className={profile.bulletin_header}>
        <h1>Bulletin Board</h1>
      </div>
      <div className={profile.bulletin_wrapper}>
        {vendorPost.map((post) => (
          <div className={profile.bulletin_posts} key={post.id}>
            <div className={profile.line}>
              <p>Date {changeDateFormat(post.date)}</p>
              <hr />
            </div>
            <p>{post.description}</p>
          </div>
        ))}
        {vendorPost === [] && (
          <p className="no_post_content">
            There are no posts to show right now.
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewVendorPosts;
