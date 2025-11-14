import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Divider 
} from "@mui/material";
import HotelName from "./AboutHotel/HotelName";
import HotelImage from "./AboutHotel/HotelImage";
import HotelPrice from "./AboutHotel/HotelPrice";
import HotelDes from "./AboutHotel/HotelDes";
import HotelLocation from "./AboutHotel/HotelLocation";

export default function AboutHotel() {
  const location = useLocation();
  const [imgCount, setImgCount] = useState(0);
  const hotelData = location.state?.hotelData;
  const imageArr = hotelData?.image || [];

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
      <HotelName hotelData={hotelData} />

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
    </Box>
  );
}
