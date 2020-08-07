import React, { useState } from "react"; //removed useEffect
import { VendorCategories } from "../../index";
import Map from "../../shared/Map";
//SVG Icons
import {
  pencil_light,
  phone_alt_light,
  envelope_light,
  map_marker_alt_light,
} from "../../../assets/svgs"; // removed pencil_regular, map_pin_place

// styling
import profile from "../../../styles/scss/vendor/a_vendors_profile.module.scss";
import about from "../../../styles/scss/vendor/a_vendors_about.module.scss";

const About = ({
  editAbout,
  vendorInfo,
  info,
  setInfo,
  editProfile,
  saveProfile,
  setVendorInfo,
}) => {
  const [editingNow, setEditingNow] = useState(null); //change back to none
  const [hoveringClass, setHoveringClass] = useState("not_hovering");

  const handleChanges = (e) => {
    setVendorInfo({
      ...vendorInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={`${profile.wrapper} ${about.about_wrapper}`}>
      <div
        className={`${profile.inner_container} ${about.about_inner_container}`}
      >
        <div className={about.column_left}>
          {/* ABOUT US  */}
          <div className={about.about_info}>
            <div className={about.info_top}>
              <h2>About Us</h2>
            </div>
            {/* ==== TOP/BOTTOM divide ====== */}
            <div className={about.info_bottom}>
              <div className={about.info_content}>
                {editingNow === "about" ? ( // TURNARY ? show form...
                  <div>
                    <form action="">
                      <textarea
                        onChange={handleChanges}
                        name="description"
                        value={vendorInfo.description}
                        cols="30"
                        rows="10"
                      ></textarea>
                    </form>
                    <p
                      className={about.save_changes}
                      onClick={(e) => {
                        setEditingNow(null);
                        saveProfile(e);
                      }}
                    >
                      <i className="fa fa-save"></i>&nbsp;save
                    </p>
                  </div> //<<<<<<< TURNARY : else...show text
                ) : (
                  <div className={about.saved_text_container}>
                    {hoveringClass === "about_pen" && (
                      <img
                        className={`${about.edit_icon}`}
                        src={pencil_light}
                        alt=""
                      />
                    )}
                    <p
                      className={about.saved_text_content}
                      onMouseOver={() => setHoveringClass("about_pen")}
                      onMouseLeave={() => setHoveringClass("not_hovering")}
                      onClick={() => {
                        setEditingNow("about");
                        setHoveringClass("not_hovering");
                      }}
                    >
                      {vendorInfo.description}
                    </p>
                  </div>
                )}{" "}
                {/* END OF TURNARY - ABOUT US */}
              </div>
              <div className={about.edit_guides}>
                {editAbout && (
                  <p>
                    <i className="fa fa-save"></i>&nbsp; click to save
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* END ABOUT US */}
          {/* HOURS OF OPERATION  */}
          <div className={about.about_info}>
            <div className={about.info_top}>
              <h2>Hours of Operation</h2>
            </div>
            {/* ==== TOP/BOTTOM divide ====== */}
            <div className={about.info_bottom}>
              <div className={about.info_content}>
                {editingNow === "hours" ? ( // TURNARY ? show form...
                  <div>
                    <form action="">
                      <textarea
                        onChange={handleChanges}
                        name="hours"
                        value={vendorInfo.hours}
                        cols="30"
                        rows="10"
                      ></textarea>
                    </form>
                    <p
                      className={about.save_changes}
                      onClick={() => {
                        setEditingNow(null);
                        saveProfile();
                        console.log("saveProfile() Profile.js info_content p ");
                      }}
                    >
                      <i className="fa fa-save"></i>&nbsp;save
                    </p>
                  </div> //<<<<<<< TURNARY : else...
                ) : (
                  <div className={about.saved_text_container}>
                    {hoveringClass === "hours_pen" && (
                      <img
                        className={`${about.edit_icon}`}
                        src={pencil_light}
                        alt=""
                      />
                    )}
                    <p
                      className={about.saved_text_content}
                      onMouseOver={() => setHoveringClass("hours_pen")}
                      onMouseLeave={() => setHoveringClass("not_hovering")}
                      onClick={() => {
                        setEditingNow("hours");
                        setHoveringClass("not_hovering");
                      }}
                    >
                      {vendorInfo.hours}
                    </p>
                  </div>
                )}{" "}
                {/* END OF TURNARY - HOURS OF OPERATION */}
              </div>
              <div className={about.edit_guides}>
                {editAbout && (
                  <p>
                    <i className="fa fa-save"></i>&nbsp; click to save
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* END HOURS OF OPERATION */}
          {/* CONTACT */}
          <div className={about.about_info}>
            <div className={about.info_top}>
              <h2>Contact</h2>
            </div>
            {/* ==== TOP/BOTTOM divide ====== */}
            <div className={about.info_bottom}>
              <div className={about.info_content}>
                {editingNow === "phone" ? ( // TURNARY ? show form...
                  <div>
                    <form action="">
                      <input
                        onChange={handleChanges}
                        name="phone"
                        value={vendorInfo.phone}
                        cols="30"
                        rows="10"
                      ></input>
                    </form>
                    <p
                      className={about.save_changes}
                      onClick={(e) => {
                        setEditingNow(null);
                        saveProfile(e);
                      }}
                    >
                      <i className="fa fa-save"></i>&nbsp;save
                    </p>
                  </div> //<<<<<<< TURNARY : else...
                ) : (
                  <div className={about.saved_text_container}>
                    {hoveringClass === "phone_pen" && (
                      <img
                        className={`${about.edit_icon}`}
                        src={pencil_light}
                        alt=""
                      />
                    )}
                    <div className={about.contact_svg_p_container}>
                      <img
                        className={`${about.contact_icon}`}
                        src={phone_alt_light}
                        alt=""
                      />
                      <p
                        className={about.saved_text_content}
                        onMouseOver={() => setHoveringClass("phone_pen")}
                        onMouseLeave={() => setHoveringClass("not_hovering")}
                        onClick={() => {
                          setEditingNow("phone");
                          setHoveringClass("not_hovering");
                        }}
                      >
                        {vendorInfo.phone}
                      </p>
                    </div>
                  </div>
                )}{" "}
                {/* END OF TURNARY - PHONE*/}
                {editingNow === "email" ? ( // TURNARY ? show form...
                  <div>
                    <form action="">
                      <input
                        onChange={handleChanges}
                        name="email"
                        value={vendorInfo.email}
                        cols="30"
                        rows="10"
                      ></input>
                    </form>
                    <p
                      className={about.save_changes}
                      onClick={(e) => {
                        setEditingNow(null);
                        saveProfile(e);
                      }}
                    >
                      <i className="fa fa-save"></i>&nbsp;save
                    </p>
                  </div> //<<<<<<< TURNARY : else...
                ) : (
                  <div className={about.saved_text_container}>
                    {hoveringClass === "email_pen" && (
                      <img
                        className={`${about.edit_icon}`}
                        src={pencil_light}
                        alt=""
                      />
                    )}
                    <div className={about.contact_svg_p_container}>
                      <img
                        className={`${about.contact_icon}`}
                        src={envelope_light}
                        alt=""
                      />
                      <p
                        className={about.saved_text_content}
                        onMouseOver={() => setHoveringClass("email_pen")}
                        onMouseLeave={() => setHoveringClass("not_hovering")}
                        onClick={() => {
                          setEditingNow("email");
                          setHoveringClass("not_hovering");
                        }}
                      >
                        {vendorInfo.email}
                      </p>
                    </div>
                  </div>
                )}{" "}
                {/* END OF TURNARY - EMAIL*/}
              </div>
              <div className={about.edit_guides}>
                {editAbout && (
                  <p>
                    <i className="fa fa-save"></i>&nbsp; click to save
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* END CONTACT */}
        </div>

        {/* ========   COLUMN LEFT/RIGHT DIVIDE ========= */}
        {/* ========   COLUMN LEFT/RIGHT DIVIDE ========= */}
        {/* ========   COLUMN LEFT/RIGHT DIVIDE ========= */}
        <div className={about.column_right}>
          {/*LOCATION AND MAP */}
          <div className={about.about_info}>
            <div className={about.info_top}>
              <h2>Location</h2>
              <img
                className={`${about.map_pin_icon}`}
                src={map_marker_alt_light}
                alt=""
              />
            </div>
            {/* ==== TOP/BOTTOM divide ====== */}
            <div className={about.info_bottom}>
              <div className={about.info_content}>
                {editingNow === "zipcode" ? ( // TURNARY ? show form...
                  <div>
                    <form action="">
                      <input
                        onChange={handleChanges}
                        name="zipcode"
                        value={vendorInfo.zipcode}
                        cols="30"
                        rows="10"
                      ></input>
                    </form>
                    <p
                      className={about.save_changes}
                      onClick={(e) => {
                        setEditingNow(null);
                        saveProfile(e);
                      }}
                    >
                      <i className="fa fa-save"></i>&nbsp;save
                    </p>
                  </div> //<<<<<<< TURNARY : else...show text
                ) : (
                  <div className={about.saved_text_container}>
                    {hoveringClass === "zipcode_pen" && (
                      <img
                        className={`${about.edit_icon}`}
                        src={pencil_light}
                        alt=""
                      />
                    )}
                    <p
                      className={about.saved_text_content}
                      onMouseOver={() => setHoveringClass("zipcode_pen")}
                      onMouseLeave={() => setHoveringClass("not_hovering")}
                      onClick={() => {
                        setEditingNow("zipcode");
                        setHoveringClass("not_hovering");
                      }}
                    >
                      {vendorInfo.zipcode}
                    </p>
                  </div>
                )}{" "}
                {/* END OF TURNARY - LOCATION */}
              </div>
              <div className={about.edit_guides}>
                {editAbout && (
                  <p>
                    <i className="fa fa-save"></i>&nbsp; click to save
                  </p>
                )}
              </div>
            </div>

            {/* <div className={about.map_container}>
              <Map zipcode={vendorInfo.location.zipcode} radius={3000} />
            </div> */}
          </div>
          {/* END LOCATION */}
        </div>
      </div>
    </div>
  );
};

export default About;
