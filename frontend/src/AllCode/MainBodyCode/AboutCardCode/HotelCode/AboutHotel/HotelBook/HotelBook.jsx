import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Divider,
  Paper,
  Stack,
  Alert,
  Fade,
  Container,
} from "@mui/material";
import {
  Hotel as HotelIcon
} from "@mui/icons-material";

import DetailsForm from "./DetailsForm";
import RoomSelection from "./RoomSelection";

export default function HotelBook() {
  const navigate = useNavigate();
  const {state} = useLocation();
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState('Hello');
  const [roomRent, setRoomRent] = useState(0);
  const [fileName, setFileName] = useState(""); // To show selected filename
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    checkin: "",
    checkout: "",
    idProof: null,
  });
  const [countryCode, setCountryCode] = useState("+91");

  // State to store quantity of each room type
  const [roomQuantities, setRoomQuantities] = useState({
    single_ac: 0,
    double_ac: 0,
    single_non_ac: 0,
    double_non_ac: 0,
  });

  const totalRooms = Object.values(roomQuantities).reduce((a, b) => a + b, 0);

  const findDay = (checkin, checkout) => {
    const checkIn = new Date(checkin);
    const checkOut = new Date(checkout);
    checkIn.setHours(0, 0, 0, 0);
    checkOut.setHours(0, 0, 0, 0);
    const days = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
    return days;
  };

  useEffect(() => {
    if (
      userDetails.checkin &&
      userDetails.checkout &&
      new Date(userDetails.checkout) > new Date(userDetails.checkin) &&
      totalRooms > 0
    ) {
      const days = findDay(userDetails.checkin, userDetails.checkout);

      const rent =
        days *
        (
          roomQuantities.double_ac * state.hotelData.doubleAC_Price +
          roomQuantities.single_ac * state.hotelData.singleAC_Price +
          roomQuantities.double_non_ac * state.hotelData.doubleNonAC_Price +
          roomQuantities.single_non_ac * state.hotelData.singleNonAC_Price
        );

      setRoomRent(rent);
    } else {
      setRoomRent(0);
    }
  }, [
    userDetails.checkin,
    userDetails.checkout,
    totalRooms,
    roomQuantities,
    state.hotelData
  ]);

  const handleIncrement = (type) => {
    if(!userDetails.checkin?.trim()){
        setShow(true);
        setMsg("Please enter checkin date");
        return;
    }

    if(!userDetails.checkout?.trim()){
        setShow(true);
        setMsg("Please enter checkout date");
        return;
    }

    if (!userDetails.checkin || !userDetails.checkout) {
        setShow(true);
        setMsg("Please select both check-in and check-out dates");
        return;
    }

    if (userDetails.checkout <= userDetails.checkin) {
        setShow(true);
        setMsg("Check-out date must be after check-in date");
        return;
    }
    setRoomQuantities((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

    const handleDecrement = (type) => {
        setRoomQuantities((prev) => ({
        ...prev,
        [type]: Math.max(0, prev[type] - 1), // Prevent negative numbers
        }));
    };

    const handleChange = (e) => {
      const { name, value, files } = e.target;
      if (name === "idProof" && files.length > 0) {
          setUserDetails((prev) => ({ ...prev, idProof: files[0] }));
          setFileName(files[0].name);
      } else {
          setUserDetails((prev) => ({ ...prev, [name]: value }));
      }
      setShow(false);
      setMsg('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(!userDetails.name?.trim()){
                setShow(true);
                setMsg("Name is required");
                return;
            }

            if (!userDetails.phone?.trim()) {
                setShow(true);
                setMsg("Contact number is required");
                return;
            }

            if (userDetails.phone.length !== 10) {
                setShow(true);
                setMsg("Enter a valid 10-digit contact number");
                return;
            }

            if(!userDetails.checkin?.trim()){
                setShow(true);
                setMsg("Please enter checkin date");
                return;
            }

            if(!userDetails.checkout?.trim()){
                setShow(true);
                setMsg("Please enter checkout date");
                return;
            }

            if(totalRooms <= 0){
                setShow(true);
                setMsg("Please select atleast one room");
                return;
            }

            let hotelData = state.hotelData;

             navigate("/show/all/payment/to/user", {
                state: {
                    userDetails,
                    roomRent,
                    totalRooms,
                    countryCode,
                    hotelData
                },
            });

        } catch (err) {
            console.log(err);
        }
    };

  return (
    <Box sx={{ bgcolor: "#f4f6f8", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="md">
        <Paper
          elevation={4}
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            bgcolor: "#fff",
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Decorative Top Bar */}
          <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, bgcolor: 'primary.main' }} />

          {/* Header */}
          <Stack direction="row" alignItems="center" justifyContent="center" gap={1} mb={4}>
            <HotelIcon color="primary" sx={{ fontSize: 40 }} />
            <Typography variant="h4" fontWeight={800} color="text.primary">
              Hotel Booking
            </Typography>
          </Stack>

          {/* --- Personal Info Section --- */}
          <DetailsForm handleChange={handleChange} countryCode={countryCode} setCountryCode={setCountryCode} fileName={fileName} />
          <Divider sx={{ my: 4 }} />

          {/* --- Room Selection Section --- */}
          <RoomSelection 
          handleDecrement={handleDecrement} 
          handleIncrement={handleIncrement} 
          roomQuantities={roomQuantities}
          totalRooms={totalRooms}
          roomRent={roomRent}
          />

          {/* --- Error Alert --- */}
          <Fade in={show}>
            <Box mt={3}>
                <Alert severity="error" onClose={() => setShow(false)} variant="filled">
                    {msg}
                </Alert>
            </Box>
          </Fade>

            <Button
                type="submit"  
                variant="contained"
                size="large"
                sx={{ mt: 2, py: 1.5, fontWeight: 700, borderRadius: 2 }}
                fullWidth
            >
                Book Now
            </Button> 
        </Paper>
      </Container>
    </Box>
  );
}