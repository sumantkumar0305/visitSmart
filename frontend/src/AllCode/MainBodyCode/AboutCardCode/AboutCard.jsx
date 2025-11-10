import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Paper, Typography, Grid,} from "@mui/material";
import Location from "./Location";
import AboutSite from "./AboutSite";
import SiteHeader from "./AboutCard/SiteHeader";
import ImageSlider from "./AboutCard/ImageSlider";
import AddHotelBtn from "./AboutCard/AddHotelBtn";
import HotelCard from "./HotelCode/HotelCard";
import AlertMsg from "../../AlertMsg";

export default function AboutCard() {
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [alert, setAlert] = useState();
  const aboutSite = location.state?.aboutSite;  
  const [siteData, setSiteData] = useState(aboutSite); // store live site data
  const [hotelData, setHotelData] = useState([]);
  
  const fetchSiteData = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/site/data/find/by/${id}`);
      setSiteData(res.data);
    } catch (err) {
      console.error("Error fetching site data:", err);
    }
  };

  const fetchRating = async (reviews) => {
    if (!reviews || reviews.length === 0) {
      setRating(0);
      return;
    }

    try {
      const responses = await Promise.all(
        reviews.map((r) => axios.get(`http://localhost:8080/find/singal/review/${r._id}`))
      );

      const ratings = responses.map((res) => res.data.rating);
      const avg = Math.ceil((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) / 10;

      setRating(avg);
    } catch (err) {
      console.error("Error fetching ratings:", err);
      setRating(0);
    }
  };

  const fetchHostel = async (hotels)=>{
    if(!hotels || hotels.length === 0){
      return;
    }

    try{
      const responses = await Promise.all(
        hotels.map((h)=> axios.get(`http://localhost:8080/hotel/find/singal/data/${h._id}`))
      );

      setHotelData(responses);
    }catch(err){
      console.error("Error fetching hotels:", err);
    }
  }

  useEffect(() => {
    if(aboutSite?._id){
      fetchSiteData(aboutSite._id);
    }
  }, [aboutSite]);

  useEffect(() => {
    const alertFromStorage = sessionStorage.getItem("hotelAlert");
    if (alertFromStorage) {
      setAlert(JSON.parse(alertFromStorage));
      sessionStorage.removeItem("hotelAlert"); // clear after use
    }
  }, []);

  useEffect(() => {
    // Run whenever siteData changes
    if (siteData?.review) {
      fetchRating(siteData.review);
    }
    if(siteData?.hotel){
      fetchHostel(siteData.hotel);
    }
  }, [siteData]);

  // 🖼️ State for image slider
  const image = [aboutSite?.image, aboutSite?.image2, aboutSite?.image3, aboutSite?.image4]// support single or multiple
  
  const handleReviewClick =()=>{
    navigate('/show/site/review/page', {state: {ID: aboutSite._id}});
  }

  const addNewHotel =()=>{
    navigate('/add/hotel/form', {state: {ID: aboutSite._id}});
  }

  return (
    <>
    {alert && <AlertMsg alert={alert} />}
    <Paper
      elevation={4}
      sx={{
        maxWidth: "100%",
        margin: "auto",
        mt: { xs: 1, sm: 2 },
        p: { xs: 2, sm: 3 },
        borderRadius: 2,
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Header Section */}
      <SiteHeader title={aboutSite?.title} rating={rating} handleReviewClick={handleReviewClick} />

      {/* Content Section */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="flex-start"
        gap={{ xs: 4, md: 8, lg: 10 }}
        p={{ xs: 1, sm: 2, md: 3 }}
      >
        {/* 🖼️ Image with slider controls */}
        <ImageSlider image={image} title={aboutSite?.title} />

        {/* 📝 About & Location Section */}
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          gap={{ xs: 2, sm: 3 }}
          width="100%"
        >
          <AboutSite aboutSite={aboutSite} />
          <Location aboutSite={aboutSite} />
        </Box>
      </Box>
      <hr />

      {/* Hotel near for this */}
      <Box mt={4}>
        <HotelCard hotelData={hotelData} />
          {/* ➕ Add New Hotel Button */}
          <Box mt={4}>
            <AddHotelBtn addNewHotel={addNewHotel} />
          </Box>
        </Box>
    </Paper>
    </>
    );
}