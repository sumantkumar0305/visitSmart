import { Box, TextField, Rating, Button, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../middleware";

export default function ReviewForm({ onClose, 
  rating: initialRating = 0, comment: initialComment = "", 
  hotelId, authorId, setAlert, onSuccess}) {
  const [rating, setRating] = useState(initialRating);
  const [comment, setComment] = useState(initialComment);

  const handleSubmit = async() => {
    if (!rating || !comment) {
      setAlert({
        type: "error",
        message: "please fill all fields!"
      })
      return;
    }

    try{
      const newReview = {rating, comment};

      const res = await axios.post(`${BASE_URL}/hotel/review/save/${hotelId}/${authorId}`, newReview);
    
      const { type, message } = res.data;
      setAlert({ type, message });
      onClose();
      onSuccess?.();

    }catch(err){
      console.log(err);
      setAlert({
        type: "error",
        message: "Something went wrong. Please try again!"
      });
    }
  };

  return (
    <Box sx={{ p: 1 }}>
      {/* Rating */}
      <Typography sx={{ fontWeight: 600, mb: 1 }}>Your Rating</Typography>
      <Rating
        value={rating}
        onChange={(event, newValue) => setRating(newValue)}
        size="large"
        sx={{ mb: 2 }}
      />

      {/* Comment */}
      <TextField
        fullWidth
        multiline
        minRows={3}
        label="Write your experience"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        sx={{ mb: 3 }}
      />

      {/* Submit Button */}
      <Button
        variant="contained"
        fullWidth
        onClick={handleSubmit}
        sx={{
          py: 1.2,
          borderRadius: 2,
          background: "linear-gradient(90deg, #3b82f6, #1d4ed8)",
          "&:hover": {
            background: "linear-gradient(90deg, #1d4ed8, #1e40af)",
          },
        }}
      >
        Submit Review
      </Button>
    </Box>
  );
}
