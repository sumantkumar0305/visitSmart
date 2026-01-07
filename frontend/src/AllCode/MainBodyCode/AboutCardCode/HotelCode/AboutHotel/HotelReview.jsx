import { useState, useEffect } from "react";
import { 
  Box, 
  Typography, 
  Rating, 
  Paper,
  Divider, 
  Tooltip, 
  Dialog, 
  DialogTitle, 
  DialogContent 
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReviewEditForm from "./ReviewEditForm";
import axios from "axios";

export default function HotelReview({ hotelData, currentUser, setAlert}) {
  const [reviews, setReviewList] = useState(hotelData.review);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const [reviewIds, setReviewIds] = useState(null);
  const [refresh, setRefresh] = useState(false);
  
  const showReviewPage = (rate, com, ID) => {
    setComment(com);
    setRating(rate);
    setReviewIds(ID);
    setOpen(true);   
  };

  const closeReviewPage = () => {
    setOpen(false);
  };

  const updatedHotel = async()=>{
    try{
      const updatedHotel = await axios.get(
        `http://localhost:8080/hotel/find/singal/data/${hotelData._id}`
      );

      setReviewList(updatedHotel.data.review);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    updatedHotel();
  }, [hotelData._id, refresh]);

  
  // ⭐ Calculate Average Rating
  const avgRating = reviews.length
  ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  : 0;

  const handleDelete = async(reviewId)=>{
    try{
      const res = await axios.delete(`http://localhost:8080/hotel/review/delete/${reviewId}/${hotelData._id}`);
      const { type, message } = res.data;
      setAlert({ type, message });

      setReviewList(prev => prev.filter(r => r._id !== reviewId));
      setRefresh(prev => !prev);
    }catch(err){
      console.log(err);
      setAlert({
        type: "error",
        message: "Some error hapend in deleting review"
      });
    }
  }

  const handleEdit = async() =>{
    try{
      const res = await axios.put(
        `http://localhost:8080/hotel/review/edit/${reviewIds}/${hotelData._id}`,
        { rating, comment }
      );

      closeReviewPage();
      const { type, message } = res.data;
      setAlert({ type, message });
      setRefresh(prev => !prev);
    }catch(err){
      console.log(err);
      setAlert({
        type: "error",
        message: "Error while updating review"
      });
    }
  }

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
      {[...reviews].reverse().map((review, index) => (
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

              {review.author?.username === currentUser?.username && (
                <Box display={"flex"} gap={3}>
                  <Tooltip title="Delete review">
                    <DeleteIcon onClick={() => handleDelete(review._id)} sx={{
                      "&:hover":{
                        cursor: "pointer"
                        
                      }
                    }} />
                  </Tooltip>

                  <Tooltip title="Edit review">
                    <EditIcon onClick={() => showReviewPage(review.rating, review.comment, review._id)} sx={{
                      "&:hover":{
                        cursor: "pointer"
                        
                      }
                    }} />
                  </Tooltip>
                </Box>
              )}
            </Box>
        </Paper>
      ))}

      {/* ⭐ Review Form Dialog */}
      <Dialog open={open} onClose={closeReviewPage} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, textAlign: "center" }}>
          Write Your Review for <b>{hotelData.name}</b>
        </DialogTitle>
        <DialogContent>
          <ReviewEditForm
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            handleEdit={handleEdit}
          />
        </DialogContent>
      </Dialog>
    </Paper>
  );
}