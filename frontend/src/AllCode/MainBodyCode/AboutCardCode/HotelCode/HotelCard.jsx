import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
  Grid,
  Paper,
  Box,
  Divider,
  TextField,
  InputAdornment
} from "@mui/material";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import HotelImage from "./HotelCard/HoteLImage";
import HotelHeader from "./HotelCard/HotelHeader";
import HotelLocation from "./HotelCard/HotelLocation";
import HotelBottom from "./HotelCard/HotelBottom";
import AlertMsg from "../../../AlertMsg";

export default function HotelCard({ setUpdateHotel, hotelData, currentUser }) {
  const navigate = useNavigate();
  const [data, setData] = useState(hotelData || []);
  const [nameSearch, setNameSearch] = useState('');
  const [alert, setAlert] = useState({
    type: "",
    message: ""
  });

  useEffect(() => {
    const search = nameSearch.trim().toLowerCase();

    if (!search) {
    setData(hotelData || []);
    return;
  }

    const filteredData = hotelData.filter(
      (hotel) =>
        hotel?.data?.name &&
        hotel.data.name.toLowerCase().includes(search)
    );
    setData(filteredData);
  }, [nameSearch, hotelData]);

  const handleClickView = (hotel) => {
    navigate("/about/hotel/details", { state: { hotelData: hotel.data, currUser: currentUser } });
  };

  const handleDeleteHotel = async (hotel) => {
    try {
      const hotelId = hotel.data._id;

      const response = await axios.delete(`https://visitsmart-backend.onrender.com/hotel/data/remove/${hotelId}`, { withCredentials: true });

      const { type, message } = response.data;

      setAlert({
        type: type,
        message: message
      });
      setUpdateHotel(prev => !prev);
    } catch (err) {
      console.log(err);
      setAlert({
        type: "error",
        message:
          err.response?.data?.message ||
          err.message ||
          "An error occurred while deleting your hotel data.",
      });
    }
  }

  const handleEditHotel = (hotel) => {
    // console.log("Edit ")
    console.log(hotel);
    console.log(currentUser);
  }

  return (
    <>
      <Box
        sx={{
          mb: 8,
          display: "flex",
          // RESPONSIVE LAYOUT: Column on mobile, Row on Tablet/Desktop
          flexDirection: { xs: "column", md: "row" }, 
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: 1000, // Increased slightly for better spacing
          // Removed minWidth: 600 which breaks mobile view
          margin: "0 auto",
          gap: 3,
          px: { xs: 2, sm: 0 } // Add padding on mobile so it doesn't touch edges
        }}
      >
        {/* TITLE */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#2C3E50",
            letterSpacing: "0.5px",
            // Center text on mobile, Left align on desktop
            textAlign: { xs: "center", md: "left" },
            width: { xs: "100%", md: "auto" }
          }}
        >
          🏨 Nearby Hotels
        </Typography>

        {/* SEARCH BOX */}
        <TextField
          placeholder="Search hotels..."
          variant="outlined"
          onChange={(e) => setNameSearch(e.target.value)}
          sx={{
            width: "100%", // Full width on mobile
            maxWidth: { xs: "100%", md: 400 }, // Limited width on desktop
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {alert.message && <AlertMsg alert={alert} />}

      {Array.isArray(data) && data.length > 0 ? (
        // Grid is inherently responsive, but we ensure the container has padding
        <Grid container spacing={4} sx={{ mt: 2, px: { xs: 2, md: 0 } }}>
          {data.map((hotel) => (
            // xs={12}: Full width on mobile
            // sm={6}: 2 cards per row on tablet
            // md={4}: 3 cards per row on desktop
            <Grid item xs={12} sm={6} md={4} key={hotel._id}>
              <Paper
                elevation={5}
                sx={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  background:
                    "linear-gradient(180deg, #ffffff 70%, #f8fafc 100%)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  height: '100%', // Ensures all cards in a row are same height
                  display: 'flex',
                  flexDirection: 'column',
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                  },
                }}
              >
                {/* Image Section with Frame */}
                <HotelImage hotel={hotel} />

                {/* Content Section */}
                <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Header: Name + Rating */}
                  <HotelHeader hotel={hotel} />

                  {/* Location */}
                  <HotelLocation hotel={hotel} />
                  <Divider sx={{ my: 2 }} />

                  {/* Footer: Price + Button - Pushed to bottom using marginTop auto */}
                  <Box sx={{ mt: 'auto' }}>
                    <HotelBottom
                      currentUser={currentUser}
                      hotel={hotel}
                      handleEditHotel={() => handleEditHotel(hotel)}
                      handleDeleteHotel={() => handleDeleteHotel(hotel)}
                      handleClickView={() => handleClickView(hotel)}
                    />
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', mt: 5, px: 2 }}>
          <Typography variant="h4" gutterBottom>No hotels available yet.</Typography>
          <Typography variant="h6" color="textSecondary">Please check back soon!</Typography>
        </Box>
      )}
    </>
  );
}
