import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Paper} from "@mui/material";
import Location from "./Location";
import AboutSite from "./AboutSite";
import SiteHeader from "./AboutCard/SiteHeader";
import ImageSlider from "./AboutCard/ImageSlider";  
import AddHotelBtn from "./AboutCard/AddHotelBtn";
import HotelCard from "./HotelCode/HotelCard";
import AlertMsg from "../../AlertMsg";
import { BASE_URL } from "../middleware";
import { useUser } from "../../context/UserContext";
   
export default function AboutCard() {
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [alert, setAlert] = useState();
  const aboutSite = location.state?.aboutSite;  
  const [siteData, setSiteData] = useState({
     review: [],
     hotel: []
   });

  // Shared across the app - no separate profile fetch needed here anymore.
  const { user, isAuthenticated: isLoggedin } = useUser();
  const [updateHotel, setUpdateHotel] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  // ✅ One request gets the site, its reviews (with ratings) AND every hotel
  // (with each hotel's reviews/authors) already populated by the backend -
  // no more per-review / per-hotel follow-up calls.
  const fetchSiteData = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/site/data/find/by/${id}`);
      setSiteData(res.data);
    } catch (err) {
      console.error("Error fetching site data:", err);
    }
  };

  useEffect(() => {
    if(aboutSite?._id){
      fetchSiteData(aboutSite._id);
    }
    // Re-fetch whenever a hotel is added/deleted so the list stays in sync -
    // still just ONE request, not one per hotel.
  }, [aboutSite, updateHotel]);

  useEffect(() => {
    const alertFromStorage = sessionStorage.getItem("hotelAlert");
    if (alertFromStorage) {
      setAlert(JSON.parse(alertFromStorage));
      sessionStorage.removeItem("hotelAlert"); // clear after use
    }
  }, []);

  // Ratings are computed locally from the already-fetched reviews - no network call.
  useEffect(() => {
    const reviews = siteData?.review;
    if (!Array.isArray(reviews) || reviews.length === 0) {
      setRating(0);
      return;
    }
    const avg = Math.ceil(
      (reviews.reduce((sum, r) => sum + (r?.rating || 0), 0) / reviews.length) * 10
    ) / 10;
    setRating(avg);
  }, [siteData]);

  const hotelData = Array.isArray(siteData?.hotel) ? siteData.hotel : [];

  // 🖼️ State for image slider
  const image = Array.isArray(aboutSite?.image) ? aboutSite.image : [];
   
   const handleReviewClick = () => {
     if (!aboutSite?._id) return;
     navigate('/show/site/review/page', { state: { ID: aboutSite._id } });
   };


  const addNewHotel =()=>{
    setIsLoad(true);
    navigate('/add/hotel/form', {state: {ID: aboutSite._id, owner: user?._id}});
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
        <HotelCard 
        setUpdateHotel={setUpdateHotel} 
        hotelData={hotelData} 
        currentUser={{ user, isAuthenticated: isLoggedin }} 
        />
          {/* ➕ Add New Hotel Button */}
          {isLoggedin && (
            <Box mt={4}>
              <AddHotelBtn isLoad={isLoad} addNewHotel={addNewHotel} /> 
            </Box>
          )}
        </Box>
    </Paper>
    </>
    );
}
