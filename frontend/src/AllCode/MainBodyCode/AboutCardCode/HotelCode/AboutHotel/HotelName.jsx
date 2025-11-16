import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import ReviewsIcon from "@mui/icons-material/Reviews";
import ReviewForm from "./ReviewForm";
import { useState } from "react";
import AlertMsg from "../../../../AlertMsg";

export default function HotelName({ hotelData, loginData }) {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: ""
  });

  const showReviewPage = () => {
    setOpen(true);
  };

  const closeReviewPage = () => {
    setOpen(false);
  };

  return (
    <>
      {/* ALERT SECTION */}
      {alert.message && <AlertMsg alert={alert} />}

      {/* TOP SECTION */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            background: "linear-gradient(90deg, #1d4ed8, #3b82f6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {hotelData?.name}
        </Typography>

        {/* REVIEW BUTTON */}
        <Button
          variant="contained"
          onClick={showReviewPage}
          startIcon={<ReviewsIcon />}
          sx={{
            background: "linear-gradient(90deg, #22c55e, #16a34a)",
            fontWeight: 600,
            borderRadius: 2,
            textTransform: "none",
            px: 3,
            py: 1,
            "&:hover": {
              background: "linear-gradient(90deg, #16a34a, #15803d)",
            },
          }}
        >
          Write your Feedback
        </Button>
      </Box>

      {/* REVIEW FORM DIALOG */}
      <Dialog open={open} onClose={closeReviewPage} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, textAlign: "center" }}>
          Write Your Review for <b>{hotelData?.name}</b>
        </DialogTitle>

        <DialogContent>
          <ReviewForm
            onClose={closeReviewPage}
            hotelId={hotelData?._id}
            authorId={loginData?._id}
            setAlert={setAlert}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
