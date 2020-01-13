import React, { useState, useEffect } from 'react';

import Map from '../Map';
import axiosWithAuth from '../../utils/axiosWithAuth';
import '../../styling/customerFacingVendorProfile.css';
// import { image } from '../../assets/rectangle.png';
import { Image, CloudinaryContext, Transformation } from "cloudinary-react";
const About = (props) => {

  const [vendor, setVendor] = useState({
    location: {}
  })

  const getVendor = (id) => {
    console.log('getvendor');
    axiosWithAuth()
      .get(`/vendors/${id}`)
      .then(response => {
        // console.log(response);
        setVendor(response.data.data)
      })
      .catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    getVendor(props.vendorId);
  }, [])

  return (
    <div>
      <div className='top_section'>
        <p>{vendor.business_name}</p>
        <CloudinaryContext cloudName='quickstlabs'>
          <Image publicId={vendor.vendor_banner}>
            <Transformation gravity='center' height='318' width='1062' crop='fill' />
          </Image>
        </CloudinaryContext>
      </div>
      <div className='bottom_section'>
        <div className='vendor_info_section'>
          <p className='title'>About Us</p>
          <p className='title_content'>{vendor.description}</p>
          <p className='title'>Hours of Operation</p>
          <p className='title_content'>{vendor.days_of_week} - {vendor.hours}</p>
          <p className='title'>Contact</p>
          <p className='title_content'>{vendor.phone}</p>
          <p className='title_content'>{vendor.email}</p>
        </div>
        <div className='location_section'>
          <p className='title'>Location</p>
          <p className='title_content'>The vendor can be found at {vendor.location.zipcode} area</p>
          <Map zipcode={vendor.location.zipcode} width={403} height={280} radius={3000} />
        </div>
      </div>

    </div>
  )

}

export default About;