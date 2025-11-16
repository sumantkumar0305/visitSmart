import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Divider 
} from "@mui/material";
import HotelName from "./HotelName";
import HotelImage from "./HotelImage";
import HotelPrice from "./HotelPrice";
import HotelDes from "./HotelDes";
import HotelLocation from "./HotelLocation";
//import HotelReview from "./AboutHotel/HotelReview";
import HotelReview from "./HotelReview";
import AlertMsg from "../../../../AlertMsg";

export default function AboutHotel() {
  const location = useLocation();
  const [imgCount, setImgCount] = useState(0);
  const hotelData = location.state?.hotelData;
  const currentUser = location.state?.currUser;
  const imageArr = hotelData?.image || [];
  const [alert, setAlert] = useState({
    type: "",
    message: ""
  });

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
    // {alert && <AlertMsg alert={alert} /> }
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
      <HotelName hotelData={hotelData} loginData={currentUser.user} />

      {/* --- Main Image --- */}
      {imageArr.length > 0 && (
        <HotelImage imageArr={imageArr} hotelData={hotelData} handlePrev={handlePrev} handleNext={handleNext} imgCount={imgCount} />
      )}

      {/* --- Price Section --- */}
      <HotelPrice hotelData={hotelData} />

      {/* --- About & Location --- */}
      <Grid container spacing={4} justifyContent="space-evenly" sx={{mb: 5}}>
        {/* About Hotel Card */}
        <HotelDes hotelData={hotelData} />
        {/* Hotel Location Card */}
        <HotelLocation hotelData={hotelData} />
      </Grid>

      <Divider />
      <HotelReview hotelData={hotelData} />
    </Box>
  );
}
