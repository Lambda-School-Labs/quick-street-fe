import React from "react";
import VendorPost from "./VendorPost";
import post from "../../../styles/scss/vendor/a_vendors_post.module.scss";

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

const VendorPostList = ({ posts }) => {
  return (
    <div className={post.vendor_post_list_container}>
      <ul>
        {posts.length !== 0
          ? posts
              .reverse()
              .map((p, idx) => (
                <VendorPost
                  key={idx}
                  content={p.description}
                  date_created={changeDateFormat(p.date)}
                />
              ))
          : null}
      </ul>
    </div>
  );
};

export default VendorPostList;
