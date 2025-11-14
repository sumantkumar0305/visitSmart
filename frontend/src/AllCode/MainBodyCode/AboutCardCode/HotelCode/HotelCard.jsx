import { useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
  Grid,
  Paper,
  Box,
  Divider,
} from "@mui/material";
import HotelImage from "./HotelCard/HoteLImage";
import HotelHeader from "./HotelCard/HotelHeader";
import HotelLocation from "./HotelCard/HotelLocation";
import HotelBottom from "./HotelCard/HotelBottom";


export default function HotelCard({ hotelData }) {
  const navigate = useNavigate();

  const handleClickView = (hotel) => {
    console.log(hotel.data);
    navigate("/about/hotel/details", { state: { hotelData: hotel.data } });
  };


  return (
    <>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 700,
          color: "#2C3E50",
          textAlign: "center",
          letterSpacing: "0.5px",
        }}
      >
        🏨 Nearby Hotels
      </Typography>

      {hotelData.length > 0 ? (
        <Grid container spacing={4}>
          {hotelData.map((hotel) => (
            <Grid item xs={12} sm={6} md={4} key={hotel._id}>
              <Paper
                elevation={5}
                sx={{
                  borderRadius: "20px",
                  overflow: "hidden", // Clips the zooming image
                  background:
                    "linear-gradient(180deg, #ffffff 70%, #f8fafc 100%)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                  },
                }}
              >
                {/* Image Section with Frame */}
                <HotelImage hotel={hotel} />

                {/* Content Section */}
                <Box sx={{ p: 3 }}>
                  {/* Header: Name + Rating */}
                  <HotelHeader hotel={hotel} />

                  {/* Location */}
                  <HotelLocation hotel={hotel} />
                  <Divider sx={{ my: 2 }} />

                  {/* Footer: Price + Button */}
                  <HotelBottom hotel={hotel} handleClickView={()=>handleClickView(hotel)} />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          <h1>No hotels available yet.</h1>
          <h4>Please check back soon!</h4>
        </>
      )}
    </>
  );
}