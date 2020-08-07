import React, { useState, useEffect } from "react";
import {
  About,
  VendorProducts,
  Bulletin,
  BannerUploader,
  Nav,
} from "../components/index";
import { Placeholder } from "../assets/images/index";
//Styles
import profile from "../styles/scss/vendor/a_vendors_profile.module.scss";
import banner from "../styles/scss/vendor/a_vendors_banner.module.scss";
//Font awesom
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSave, faPen } from '@fortawesome/free-solid-svg-icons';
import { Image, CloudinaryContext, Transformation } from "cloudinary-react";
import axiosWithAuth from "../utils/axiosWithAuth";
import Footer from "../components/shared/Footer";
import browse from "../styles/scss/browse.module.scss";

//This is the VENDOR PROFILE PAGE!!!!

const ProfilePage = (props) => {
  // It all starts here!...with vendorId from localStorage
  const [vendorId] = useState(localStorage.getItem("user_id")); // removed setVendorId from const
  const [vendorInfo, setVendorInfo] = useState({
    location: {
      zipcode: "18641",
    },
  });
  const [bannerInfo, setBannerInfo] = useState("no_banner.jpg");
  const [products, setProducts] = useState([]);
  // const [productImagesIds, setProductImagesIds] = useState([]);

  // Booleans

  const [editingName, setEditingName] = useState(false);
  // bool for reloading products after product update.
  const [reloadProducts, setReloadProducts] = useState(false);
  const [editAbout, setEditAbout] = useState(false);
  // const [editBusinessName, setEditBusinessName] = useState(false);

  useEffect(() => {
    axiosWithAuth()
      .get(`/vendors/me`)
      .then((response) => {
        setVendorInfo(response.data);

      })
      .catch((error) => {
        console.log("ERROR Profile.js GET vendors/:vendorId error: ", error);
      });
  }, [vendorId]);

  useEffect(() => {
  
    axiosWithAuth()
      .get(`/vendors/me/products`)
      .then((response) => {

        setProducts(response.data);
      })
      .catch((error) => {
        console.log(
          error
        );
      });
  }, [vendorId, reloadProducts, setReloadProducts]);



  const saveName = () => {
    axiosWithAuth()
      .put(`/vendors/me/update`, vendorInfo)
      .then((res) => {
        setVendorInfo(res.data[0]);
      })
      .catch((err) => {
        console.log("ERROR PUT SAVE NAME", err);
      });
  };

  const editProfile = () => {
    setEditAbout(!editAbout);
  };

  const saveProfile = (e) => {
    if (e) {
      e.preventDefault();
    }

    axiosWithAuth()
      .put(`/vendors/me/update`, vendorInfo)
      .then((res) => {
        setVendorInfo(res.data[0]);
      })
      .catch((err) => {
        console.log("VendorProf. PUT error ", err);
      });
  };

  let newImage = "product-images/" + vendorInfo.public_id;

  return (
    <React.Fragment>
      <div style={{ backgroundColor: "#00B2ED" }} className={browse.temp_menu}>
        <Nav />
      </div>
      <div className={profile.profile_container} data-testid="profile-page">
        <div className={`${profile.wrapper} ${banner.banner_wrapper}`}>
          <div
            className={`${profile.inner_container} ${banner.inner_banner_container}`}
          >
            <div className={banner.banner_text_btns}>
              <div className={banner.vendor_header_name}>
                {editingName ? ( // <<<<<<<<<< turnary ?
                  <div>
                    <input
                      className={banner.business_name_input}
                      onChange={(e) => {
                        if (editingName) {
                          setVendorInfo({
                            ...vendorInfo,
                            business_name: e.target.value,
                          });
                        }
                      }}
                      value={vendorInfo.business_name}
                    />
                    <div
                      className={banner.edit_guides}
                      onClick={() => {
                        setEditingName(false);
                        saveName();
                      }}
                    >
                      <p className={`${banner.save_changes}`}>
                        <i className="fa fa-save"></i>&nbsp; Save
                      </p>
                    </div>
                  </div>
                ) : (
                  <h1
                    onClick={() => setEditingName(true)}
                    className={banner.business_name_text}
                  >
                    {vendorInfo.business_name}
                  </h1>
                )}
              </div>
            </div>

            <div className={banner.vendor_banner_image_container}>
              {vendorInfo.vendor_banner !== `no-photo.jpg` ? (
                <CloudinaryContext cloudName="quickstlabs">
                  <Image
                    className={banner.vendor_banner_image}
                    publicId={newImage}
                  >
                    <Transformation
                      gravity="center"
                      height="500"
                      width="1800"
                      crop="limit"
                    />
                  </Image>
                </CloudinaryContext>
              ) : (
                <img
                  className="vendor_banner_image"
                  src={Placeholder}
                  alt="vendor header"
                />
              )}

              <BannerUploader
                vendorId={vendorId}
                vendorInfo={vendorInfo}
                setBannerInfo={setBannerInfo}
                bannerInfo={bannerInfo}
              />
            </div>
          </div>
        </div>

        <About
          vendorInfo={vendorInfo}
          editAbout={editAbout}
          editProfile={editProfile}
          saveProfile={saveProfile}
          setVendorInfo={setVendorInfo}
        />
        <VendorProducts
          setReloadProducts={setReloadProducts}
          reloadProducts={reloadProducts}
          products={products}
          vendorId={vendorInfo.id}
        />
        <Bulletin vendorId={vendorId} />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default ProfilePage;
