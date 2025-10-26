import React, { useState } from "react";
import {
  Box,
  Typography,
  Rating,
  Paper,
  Divider,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ReviewHelper from "./ReviewHelper"
import AlertMsg from '../../../AlertMsg';
import ReviewResult from "./ReviewResult";


const Review = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]); // 🔹 Array to store multiple reviews
  const [alert, setAlert] = useState({
    type: "",
    message: ""
  });

  const handleCommentChange =(e)=>{
    setComment(e.target.value);
  }

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleSubmit = () => {
    if (rating === 0 || comment.trim() === "") {
      setAlert({
        type: "error",
        message: "Either Rating or Comment is missing"
      });
      return;
    }

    // Add new review to the list
    const newReview = {
      id: Date.now(),
      rating,
      comment,
    };

    setReviews((prev) => [newReview, ...prev]); // newest first
    setRating(0);
    setComment("");
  };

  return (
    <>
    {alert.type && alert.message && <AlertMsg alert={alert} />}
    <Box sx={{ px: 2, py: { xs: 3, sm: 4 }, maxWidth: 700, mx: "auto" }}>
      <Paper
        elevation={6}
        sx={{
          padding: { xs: 3, sm: 4 },
          borderRadius: 3,
          background: "#d534eb",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          textAlign="center"
          fontWeight="bold"
          sx={{
            color: "#333",
            fontSize: { xs: "1.8rem", sm: "2.2rem" },
          }}
        >
          Leave a Review
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <ReviewHelper handleSubmit={handleSubmit} handleRatingChange={handleRatingChange} handleCommentChange={handleCommentChange} comment={comment} rating={rating} />
      </Paper>

      {/* 🧩 Result Box Section */}
      {reviews.length > 0 && (
        <Paper
          elevation={4}
          sx={{
            mt: 4,
            p: { xs: 2.5, sm: 3 },
            borderRadius: 3,
            backgroundColor: "#fff",
            boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
            transition: "all 0.3s ease",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: "#333", mb: 2 }}
          >
            📝 Submitted Reviews
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <ReviewResult reviews={reviews} />
        </Paper>
      )}
    </Box>
    </>
  );
};

export default Review;
