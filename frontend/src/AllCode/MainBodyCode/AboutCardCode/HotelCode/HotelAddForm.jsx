import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import axios from "axios";
import InputField from "./HotelAddForm/InputField";
import ImageUpload from "./HotelAddForm/ImageUpload";
import AlertMsg from "../../../AlertMsg";
import CircularProgress from "@mui/material/CircularProgress";

export default function HotelAddForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [hotelData, setHotelData] = useState({
      name: "",
      aboutHotel: "",
      doubleAC_Price: "",
      singleAC_Price: "",
      doubleNonAC_Price: "",
      singleNonAC_Price: "",
      city: "",
      pincode: "",
    });
    const [images, setImages] = useState([]);
    const [alert, setAlert] = useState({
        type: "",  
        message: ""
    });

  // handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelData((prev) => ({ ...prev, [name]: value }));
  };

  // handle multiple image selection
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages((prev) => [...prev, ...selectedFiles]);
  };

  const ID = location.state?.ID;
  const owner = location.state?.owner;
  // submit handler
  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
   const formData = new FormData();
    for (let key in hotelData) {
    formData.append(key, hotelData[key]);
    }
    formData.append("owner", owner);

    images.forEach((image) => {
    formData.append("images", image); // "images" must match backend field name
    });

    const response = await axios.post(`https://visitsmart-backend.onrender.com/hotel/data/save/${ID}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });  

    const { type, message } = response.data;

    setAlert({
      type: type,
      message: message
    });

    setTimeout(() => {
      sessionStorage.setItem("hotelAlert", JSON.stringify({ type, message }));
      navigate(-1);
    }, 500);

    //alert("Hotel uploaded successfully!");
  } catch (err) {
    console.error("❌ Error:", err);
    setAlert({
      type: "error",
      message:
        err.response?.data?.message ||
        err.message ||
        "An error occurred while submitting your hotel data.",
    });
    setLoading(false);
  }
};

  return (
    <>
    {alert.type === "error" && <AlertMsg alert={alert} />}
    <Paper
      elevation={3}
      sx={{ maxWidth: 500, mx: "auto", p: 4, mt: 5, borderRadius: 3 }}
    >
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
        Add New Hotel  
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <InputField hotelData={hotelData} handleChange={handleChange} />

          {/* Multiple file input */}
          <ImageUpload images={images} handleImageChange={handleImageChange} />

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <CircularProgress size={28} color="primary" />
            </Box>
          ) : (
            <Button type="submit" variant="contained">
              Add Hotel
            </Button>
          )}
        </Stack>
      </Box>
    </Paper>
    </>
  );
}
