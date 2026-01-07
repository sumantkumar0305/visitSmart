import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    Box,
    Paper,
    Divider,
    Container,
} from "@mui/material";
import PaymentHead from "./PaymentHead";
import StayDetails from "./StayDetails";
import PriceBox from "./PriceBox";
import PayButton from "./PayButton";
import QRTicket from "./QRTicket";

export default function HotelPayment() {
    const { state } = useLocation();
    const navigate = useNavigate();
    if (!state) return null;

    const [openTicket, setOpenTicket] = useState(false);
    const [bookingId, setBookingId] = useState("");
    const {
        userDetails,
        roomRent,
        totalRooms,
        countryCode,
        hotelData
    } = state;

    let gstPrice = roomRent*0.18;
    let otherCharge = roomRent*0.10;
    let totalCharge = gstPrice+otherCharge+roomRent;

    const handlePayment = () => {
        const id = "HTL-" + Date.now(); // unique booking id
        setBookingId(id);
        setOpenTicket(true);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                py: 8,
                background: "linear-gradient(135deg, #e3f2fd, #fce4ec)"
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={10}
                    sx={{
                        p: 4,
                        borderRadius: 4,
                        backdropFilter: "blur(10px)"
                    }}
                >
                    {/* Header */}
                    <PaymentHead countryCode={countryCode} userDetails={userDetails} />
                    <Divider sx={{ my: 3 }} />

                    {/* Stay Details */}
                    <StayDetails totalRooms={totalRooms} userDetails={userDetails} />

                    {/* Price Box */}
                    <PriceBox 
                    roomRent={roomRent} 
                    gstPrice={gstPrice} 
                    otherCharge={otherCharge} 
                    totalCharge={totalCharge} 
                    />
                    

                    {/* Pay Button */}
                    <PayButton totalCharge={totalCharge} handlePayment={handlePayment} />
                </Paper>
            </Container>

            <QRTicket 
            openTicket={openTicket}
            setOpenTicket={setOpenTicket}
            Name={userDetails.name}
            totalRooms={totalRooms}
            totalCharge={totalCharge}
            bookingId={bookingId}
            />
        </Box>
    );
}
