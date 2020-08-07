import React, { useState, useEffect } from "react";
import { AddPostForm, VendorPostList } from "../../index";
import axiosWithAuth from "../../../utils/axiosWithAuth";
import profile from "../../../styles/scss/vendor/a_vendors_profile.module.scss";
import bulletin from "../../../styles/scss/vendor/a_vendors_bulletin.module.scss";

const Bulletin = (props) => {
  const [showAddPostForm, setShowAddPostForm] = useState(false);
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({
    content: "",
    zipcode: "",
  });

  const getPosts = () => {
    axiosWithAuth()
      .get(`/vendors/me/posts`)
      .then((res) => {
        setPosts(res.data);
      });
  };

  const addPost = (e) => {
    e.preventDefault();
    setShowAddPostForm(!showAddPostForm);
  };

  const cancelAddPost = (e) => {
    e.preventDefault();
    setShowAddPostForm(false);
  };

  const postSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post(`/vendors/me/posts`, {
        title: "test title",
        description: post.content,
        date: post.date,
      })
      .then((res) => {
        getPosts();
      })
      .catch((err) => console.log("error posting post"));

    setPost({ post: "", content: "" });
    setShowAddPostForm(false);
  };

  useEffect(() => {
    getPosts();
  }, []); // removed [] dependency

  return (
    <div
      className={`${profile.wrapper} ${bulletin.bulletin_wrapper}`}
      data-testid="bulletin-wrapper"
    >
      <div
        className={`${profile.inner_container} ${bulletin.bulletin_inner_container}`}
      >
        <div className={bulletin.inner_bulletin_wrapper}>
          <div className={bulletin.bulletin_header}>
            <h1>Bulletin Board</h1>
            <div className={bulletin.vendor_add_post_btn_wrapper}>
              <button
                className={`btn btn-primary ${bulletin.vendor_bulletin_button}`}
                onClick={addPost}
              >
                Add Post
              </button>
            </div>
          </div>

          <AddPostForm
            show={showAddPostForm}
            cancelAddPost={cancelAddPost}
            post={post}
            setPost={setPost}
            postSubmit={postSubmit}
          />

          <VendorPostList posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default Bulletin;
