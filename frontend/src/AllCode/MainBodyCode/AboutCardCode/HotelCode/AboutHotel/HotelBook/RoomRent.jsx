import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider
} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import AlertMsg from "../../../../../AlertMsg";

export default function RoomRent({ hotelData, loginData }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: ""
  });

  const handleBtn = ()=>{
    console.log("Hello i am hearing");
    if(!loginData){
      setAlert({
        type: "error",
        message: "Please log in first then book the hotel",
      });
      sessionStorage.setItem("Path", "/about/hotel/details");

      setTimeout(() => {
        navigate("/login/form");
      }, 1100);   
      // setLoading(false);
      return;
    }
    setIsLoad(true);
    navigate("/book/hotel", {state: {hotelData},});
  }

  return (
    <>
      {alert.message && <AlertMsg alert={alert} />}
      {/* Action Bar */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          p: 3,
          borderRadius: 3,
          background: "linear-gradient(135deg, #f8fafc, #eef2ff)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          maxWidth: { xs: "100%", md: 850 },
          mx: "auto",
          mb: 4
        }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={() => setOpen(true)}
          sx={{
            px: 5,
            py: 1.5,
            borderRadius: 3,
            fontSize: "1.1rem",
            fontWeight: 600,
            textTransform: "none",
            background: "linear-gradient(90deg, #6366f1, #4f46e5)",
            boxShadow: "0 8px 18px rgba(99,102,241,0.4)",
            "&:hover": {
              background: "linear-gradient(90deg, #4f46e5, #4338ca)",
              transform: "translateY(-2px)",
            },
          }}
        >
          Check Prices
        </Button>

        <Button
          variant="contained"
          size="large"
          onClick={handleBtn}
          sx={{  
            px: 5,
            py: 1.5,
            borderRadius: 3,
            fontSize: "1.1rem",
            fontWeight: 600,
            textTransform: "none",
            background: "linear-gradient(90deg, #22c55e, #16a34a)",
            boxShadow: "0 8px 18px rgba(34,197,94,0.4)",
            "&:hover": {
              background: "linear-gradient(90deg, #16a34a, #15803d)",
              transform: "translateY(-2px)",
            },
          }}
        >
          {isLoad ? <CircularProgress color="white" /> : "Book now"}
        </Button>
      </Box>

      {/* Price Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: 700,
            fontSize: "1.5rem"
          }}
        >
          Choose Your Room
        </DialogTitle>

       <DialogContent>
        {[
          { type: "Single Bed with AC", price: hotelData.singleAC_Price },
          { type: "Double Bed with AC", price: hotelData.doubleAC_Price },
          { type: "Single Bed without AC", price: hotelData.singleNonAC_Price },
          { type: "Double Bed without AC", price: hotelData.doubleNonAC_Price },
        ].map((room, index) => (
          <Box
            key={index}
            sx={{
              p: 2,
              mb: 2,
              borderRadius: 2,
              bgcolor: "grey.100",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "0.3s",
              "&:hover": {
                bgcolor: "grey.200",
                transform: "scale(1.02)",
              },
            }}
          >
            <Typography fontWeight={600}>
              {room.type}
            </Typography>

            <Typography fontWeight={700} color="primary">
              ₹{room.price}/day
            </Typography>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
        >
          Prices may vary based on availability and season.
        </Typography>
      </DialogContent>

      </Dialog>
    </>
  );
}
