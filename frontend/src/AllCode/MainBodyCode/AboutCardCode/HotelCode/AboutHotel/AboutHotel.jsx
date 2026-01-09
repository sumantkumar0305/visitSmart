import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Divider 
} from "@mui/material";
import axios from "axios";
import HotelName from "./HotelName";
import HotelImage from "./HotelImage";
import RoomRent from "./HotelBook/RoomRent";
import HotelDes from "./HotelDes";
import HotelLocation from "./HotelLocation";
import HotelReview from "./HotelReview";
import { fetchUserProfile } from "../../../middleware";
import AlertMsg from "../../../../AlertMsg";

export default function AboutHotel() {
  const location = useLocation();
  const [imgCount, setImgCount] = useState(0);
  const [hotelData, setHotelData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const imageArr = hotelData?.image || [];
  const [alert, setAlert] = useState({
    type: "",
    message: ""
  });

  const currentUserID = async() =>{
    const loggedIn = await fetchUserProfile();
    setCurrentUser(loggedIn.user);  
  }

  useEffect(() => {
    currentUserID(); 
    if (location.state?.hotelData) {
      setHotelData(location.state.hotelData);
    }
  }, [location.state]);

  useEffect(() => {
    if (!hotelData || !hotelData._id) return;  // <-- FIX

    const fetchUpdateData = async () => {
      const updatedHotel = await axios.get(
        `https://visitsmart-backend.onrender.com/hotel/find/singal/data/${hotelData._id}`
      );
      setHotelData(updatedHotel.data);
    };

    fetchUpdateData();
  }, [hotelData]);


  if (!hotelData) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <Typography variant="h6" color="text.secondary" sx={{ textAlign: "center" }}>
          No hotel data found.
        </Typography>
      </Box>
    );
  }

  // Image navigation handlers
  const handleNext = () => {
    setImgCount((prev) => (prev + 1) % imageArr.length);
  };

  const handlePrev = () => {
    setImgCount((prev) => (prev - 1 + imageArr.length) % imageArr.length);
  };

  return (
    <>
    {alert.message && <AlertMsg alert={alert} /> }
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        my: 4,
        px: 3,
        py: 4,
        borderRadius: 3,
      }}
    >
      {/* --- Hotel Header --- */}
      <HotelName hotelData={hotelData} loginData={currentUser} />

      {/* --- Main Image --- */}
      {imageArr.length > 0 && (
        <HotelImage imageArr={imageArr} hotelData={hotelData} handlePrev={handlePrev} handleNext={handleNext} imgCount={imgCount} />
      )}

      {/* --- Price Section --- */}
      <RoomRent hotelData={hotelData} loginData={currentUser} />

      {/* --- About & Location --- */}
      <Grid container spacing={4} justifyContent="space-evenly" sx={{mb: 5}}>
        {/* About Hotel Card */}
        <HotelDes hotelData={hotelData} />
        {/* Hotel Location Card */}
        <HotelLocation hotelData={hotelData} />
      </Grid>

      <Divider />
      <HotelReview hotelData={hotelData} currentUser={currentUser} setAlert={setAlert}  />
    </Box>
    </>
  );
}
