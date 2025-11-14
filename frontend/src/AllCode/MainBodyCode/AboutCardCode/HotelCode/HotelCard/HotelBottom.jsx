import { Stack, Typography, Button } from "@mui/material"

export default function HotelBottom({hotel, handleClickView}){
    return(
        <>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography
                    variant="h6"
                    sx={{
                    fontWeight: 700,
                    background: "linear-gradient(90deg, #16a34a, #22c55e)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    }}
                >
                    <strong>₹{hotel.data.price.toLocaleString()}</strong>
                    <span
                    style={{
                        fontSize: "0.9rem",
                        color: "#555",
                        fontWeight: 500,
                        WebkitTextFillColor: "#555", // Needs to be reset
                    }}
                    >
                    /hour
                    </span>
                </Typography>
                <Button variant="contained" size="medium" onClick={handleClickView} disableElevation>
                    View Details
                </Button>
            </Stack>
        </>
    )
}