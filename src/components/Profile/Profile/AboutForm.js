import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import about from "../../../styles/css/vendor_about.module.css";

const AboutForm = ({ editAbout, vendorInfo, info, setVendorInfo }) => (
  <h1>Yo</h1>
);

//   const changeHandler = (e) => {
//     if (editAbout) {
//       setVendorInfo({ ...vendorInfo, [e.target.name]: e.target.value });
//     }
//   };

//   // const changeZip = (e) => {
//   //   if (editAbout) {
//   //     setVendorInfo({
//   //       ...vendorInfo,
//   //       location: { ...vendorInfo.location, zipcode: e.target.value }
//   //     });
//   //   }
//   // };

//   return (
//     <div>
//       <form className={about.vendor_info_form}>
//         <div className={about.vendor_info_left}>
//           <div
//             className={`${about.vendor_info_about} ${about.input_container}`}
//           >
//             <label for="about">Bio</label>
//             <textarea
//               type="text"
//               name="description"
//               value={vendorInfo.description}
//               onChange={changeHandler}
//             />
//           </div>

//           <div
//             className={`${about.vendor_info_phone} ${about.input_container} `}
//           >
//             <h5>Contact</h5>
//             <label>Phone</label>
//             <div className={about.inputWithIcon}>
//               <input
//                 type="text"
//                 name="phone"
//                 value={vendorInfo.phone}
//                 onChange={changeHandler}
//               />
//               <FontAwesomeIcon className={about.input_icon} icon={faPhone} />
//             </div>
//             <label>Email</label>
//             <div className={about.inputWithIcon}>
//               <input
//                 type="text"
//                 name="email"
//                 value={vendorInfo.email}
//                 onChange={changeHandler}
//               />
//               <FontAwesomeIcon
//                 className={about.input_icon}
//                 icon={faPaperPlane}
//               />
//             </div>
//           </div>
//         </div>{" "}
//         {/* --vendor_info_left */}
//         <div className={about.vendor_info_right}>
//           <div className={(about.vendor_info_location, about.input_container)}>
//             <label>Zipcode: </label>
//             {/* REPLACE 18641 w/ vendorInfo.location.zipcode */}
//             <input
//               type="text"
//               name="zipcode"
//               value={vendorInfo.zipcode}
//               onChange={changeHandler}
//             />
//             <div className={about.map_container}>
//               {/* <Map zipcode={vendorInfo.location.zipcode} width={403} height={280} radius={3000} /> */}
//             </div>
//           </div>
//         </div>{" "}
//         {/* --vendor_info_right */}
//       </form>
//     </div>
//   );
// };

export default AboutForm;
