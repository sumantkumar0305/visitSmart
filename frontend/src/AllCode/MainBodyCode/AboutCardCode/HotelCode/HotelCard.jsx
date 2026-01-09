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
  const [data, setData] = useState(hotelData);
  const [nameSearch, setNameSearch] = useState('');
  const [alert, setAlert] = useState({
    type: "",  
    message: ""
  });

  useEffect(()=>{
    const search = nameSearch.trim().toLowerCase();

    if (!search) {
      setData(hotelData);
      return;
    }

    const filteredData = hotelData.filter((hotel) =>
      hotel.data.name.toLowerCase().includes(search)
    );

    setData(filteredData);
  }, [nameSearch, hotelData]);

  const handleClickView = (hotel) => {  
    navigate("/about/hotel/details", { state: { hotelData: hotel.data, currUser: currentUser } });
  };  
  
  const handleDeleteHotel = async(hotel) =>{
    try{
      const hotelId = hotel.data._id;
      
      const response = await axios.delete(`https://visitsmart-backend.onrender.com/hotel/data/remove/${hotelId}`, { withCredentials: true });

      const { type, message } = response.data;

      setAlert({
        type: type,
        message: message
      });
      setUpdateHotel(prev => !prev);
    }catch(err){
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

  const handleEditHotel = (hotel) =>{
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
          flexDirection: "row", // ✅ side by side
          alignItems: "center",
          justifyContent: "space-between", // pushes left & right apart
          width: "100%",
          maxWidth: 800, // optional: control container width
          minWidth: 600,
          margin: "0 auto", // center the whole box
          gap: 3,
        }}
      >
        {/* TITLE */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#2C3E50",
            letterSpacing: "0.5px",
          }}
        >
          🏨 Nearby Hotels
        </Typography>

        {/* SEARCH BOX */}
        <TextField
          placeholder="Search hotels using hotel name..."
          variant="outlined"
          onChange={(e)=>setNameSearch(e.target.value)}
          sx={{
            width: "100%",
            maxWidth: 400,
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

      {data.length > 0 ? (
        <Grid container spacing={4} sx={{mt: 5}}>
          {data.map((hotel) => (
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
                  <HotelBottom 
                  currentUser={currentUser}
                  hotel={hotel}
                  handleEditHotel={()=>handleEditHotel(hotel)}
                  handleDeleteHotel={()=>handleDeleteHotel(hotel)} 
                  handleClickView={()=>handleClickView(hotel)} 
                  />
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
