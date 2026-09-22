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
import { BASE_URL } from "../../../middleware";
import { useUser } from "../../../../context/UserContext";
import AlertMsg from "../../../../AlertMsg";

export default function AboutHotel() {
  const location = useLocation();
  const [imgCount, setImgCount] = useState(0);
  const [hotelData, setHotelData] = useState(null);
  const { user: currentUser } = useUser();
  const imageArr = hotelData?.image || [];
  const [alert, setAlert] = useState({
    type: "",
    message: ""
  });
  // Bumped whenever a review is added/edited/deleted so the review list refreshes.
  const [reviewRefresh, setReviewRefresh] = useState(false);
  const triggerReviewRefresh = () => setReviewRefresh((prev) => !prev);

  useEffect(() => {
    if (location.state?.hotelData) {
      setHotelData(location.state.hotelData);
    }
  }, [location.state]);

  // Only re-runs when we navigate to a *different* hotel (or a review changes),
  // not every time setHotelData below updates the object - that was causing an
  // infinite fetch loop before.
  const hotelId = location.state?.hotelData?._id;
  useEffect(() => {
    if (!hotelId) return;

    const fetchUpdateData = async () => {
      try {
        const updatedHotel = await axios.get(
          `${BASE_URL}/hotel/find/singal/data/${hotelId}`
        );
        setHotelData(updatedHotel.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUpdateData();
  }, [hotelId, reviewRefresh]);


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
      <HotelName hotelData={hotelData} loginData={currentUser} onReviewChange={triggerReviewRefresh} />

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
      <HotelReview hotelData={hotelData} currentUser={currentUser} setAlert={setAlert} refresh={reviewRefresh} onReviewChange={triggerReviewRefresh} />
    </Box>
    </>
  );
}
