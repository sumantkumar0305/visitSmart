import { useState, useEffect } from "react";
import { Box, Typography, Rating, Paper, Divider, Tooltip, Dialog, DialogTitle, DialogContent  } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReviewForm from "./ReviewForm";
import { fetchHotelReview } from "../../../middleware.js";

export default function HotelReview({ hotelData }) {
  // const [avgRating, setAvgRating] = useState(0);
  // const [reviews, setReviews] = useState([]);
  const reviews = hotelData.review;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  
  const showReviewPage = (rate, com) => {
    setComment(com);
    setRating(rate);
    setOpen(true);
  };
  console.log(reviews[0].author.username)

  const closeReviewPage = () => {
    setOpen(false);
  };

  // ⭐ Calculate Average Rating
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        width: "100%",
        mt: 4
      }}
    >
      {/* ⭐ Title + Avg Rating on Right */}
      <Box 
        sx={{ 
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Guest Reviews
        </Typography>

        {/* Right Side Avg Rating */}
        <Paper 
          variant="outlined" 
          sx={{ 
            p: 1.5, 
            borderRadius: 2, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1.5,
            backgroundColor: 'grey.50'
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
            {avgRating.toFixed(1)}
          </Typography>
          <Box>
            <Rating value={avgRating} precision={0.1} readOnly size="small" />
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              Based on {reviews.length} reviews
            </Typography>
          </Box>
        </Paper>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* ⭐ List of Reviews */}
      {reviews.map((review, index) => (
        <Paper
            key={index}
            variant="outlined"
            sx={{
                p: 2.5,
                borderRadius: 3,
                backgroundColor: 'grey.50', // Very light background
                mb: 3
            }}
        >
            {/* Review Header: Avatar, Name, Rating */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, justifyContent: 'space-between' }}>
                
                {/* Left Side: Avatar + Name */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                    {review.author?.username}
                </Typography>
                </Box>
                
                {/* Right Side: Rating */}
                <Rating value={review.rating} readOnly />
            </Box>
        
            {/* Review Comment */}
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body1" color="text.secondary" sx={{ pl: '52px' }}> 
                "{review.comment}"
              </Typography>

              <Box display={"flex"} gap={3}>
                <Tooltip title="Delete review">
                  <DeleteIcon sx={{
                    "&:hover":{
                      cursor: "pointer"
                      
                    }
                  }} />
                </Tooltip>

                <Tooltip title="Edit review">
                  <EditIcon onClick={() => showReviewPage(review.rating, review.comment)} sx={{
                    "&:hover":{
                      cursor: "pointer"
                      
                    }
                  }} />
                </Tooltip>
              </Box>
            </Box>
        </Paper>
      ))}

      {/* ⭐ Review Form Dialog */}
      <Dialog open={open} onClose={closeReviewPage} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, textAlign: "center" }}>
          Write Your Review for <b>{hotelData.name}</b>
        </DialogTitle>
        <DialogContent>
          <ReviewForm onClose={closeReviewPage} rating={rating} comment={comment} />
        </DialogContent>
      </Dialog>
    </Paper>
  );
}