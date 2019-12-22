import React, { useState } from "react";

const VendorAddPostForm = () => {
  let today = new Date();

  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  const [post, setPost] = useState({
    content: "",
    zipcode: ""
  });

  const postChangeHandler = e => {
    setPost({ ...post, [e.target.name]: e.target.value });
    console.log(post);
  };

  return (
    <form>
      <p>{`Date ${today}`}</p>
      <textarea
        value={post.content}
        onChange={postChangeHandler}
        name="content"
      />
      <input
        type="text"
        name="zipcode"
        value={post.zipcode}
        onChange={postChangeHandler}
        placeholder="77777"
      />
      <button>Save</button>
      <button>Cancel</button>
    </form>
  );
};

export default VendorAddPostForm;