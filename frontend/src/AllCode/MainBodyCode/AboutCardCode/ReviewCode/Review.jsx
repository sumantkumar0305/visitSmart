import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Button,
  Divider,
} from "@mui/material";
import ReviewHelper from "./ReviewHelper"
import AlertMsg from '../../../AlertMsg';
import ReviewResult from "./ReviewResult";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import ReviewBtn from "./ReviewBtn";
import ReviewEdit from "./ReviewEdit";
import { fetchReviews, fetchUserProfile } from "../../middleware";
// import { fetchUserProfile } from "../../middleware";

const Review = () => {
  const location = useLocation();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]); // 🔹 Array to store multiple reviews
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editReview, setEditReview] = useState(null);
  const [alert, setAlert] = useState({
    type: "",  
    message: ""
  });
  // const [isEdit, setIsEdit] = useState(true);

  const ID = location.state?.ID;
  const loadReviews = async () => {
    try {
      const data = await fetchReviews(ID);
      setReviews(data);
    } catch (err) {
      console.error("Error loading reviews:", err);
    }
  };

  const handleCommentChange =(e)=>{
    setComment(e.target.value);
  }

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleDelete =async(reviewid)=> {
    try{
      
      const response = await axios.post(`http://localhost:8080/site/review/delete/${reviewid}`);
      const { type, message } = response.data;
      setAlert({ type, message });
      loadReviews();
    }catch(err){
    setAlert({
      type: "error",
      message: err.message || "Something went wrong while deleting review.",
    });
    }
  };

  const handleEdit = async(reviewData)=>{
    setIsEdit(true);
    setEditReview(reviewData);
  }

  const handleSubmit = async () => {
  if (rating === 0 || comment.trim() === "") {
    setAlert({
      type: "error",
      message: "Either Rating or Comment is missing",
    });
    return;
  }

  setLoading(true);

  const newReview = { rating, comment };

  try {
    const loggedIn = await fetchUserProfile();
    console.log(loggedIn.user._id);
    const authorId = loggedIn.user._id;
    const response = await axios.post(`http://localhost:8080/site/review/save/${ID}/${authorId}`, newReview);
    const { type, message } = response.data;
    setAlert({ type, message });
    // Reset form
    setRating(0);
    setComment("");
    loadReviews();
    setLoading(false);
  } catch (error) {
    console.error("Review submission failed:", error);

    setAlert({
      type: "error",
      message: error.message || "An error occurred while submitting your review.",
    });
  }finally{
    setLoading(false);
  }
};

useEffect(() => {
  loadReviews();
}, [ID]);

  return (
    <>
    {alert.type && alert.message && <AlertMsg alert={alert} />}
    <Box sx={{ px: 2, py: { xs: 3, sm: 4 }, maxWidth: 700, mx: "auto" }}>
    {isEdit ? (
      <ReviewEdit editReview={editReview} setIsEdit={setIsEdit} fetchReviews={loadReviews} />
    ):(
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

        <ReviewHelper 
        handleRatingChange={handleRatingChange} 
        handleCommentChange={handleCommentChange} 
        comment={comment} 
        rating={rating} 
        />

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress size={28} color="#f5ce42" />
          </Box>
        ):(
        <ReviewBtn handleSubmit={handleSubmit} />
        )}
      </Paper>        
      )}

      {/* 🧩 Result Box Section */}
          <ReviewResult reviews={reviews} handleDelete={handleDelete} handleEdit={handleEdit} />
    </Box>
    </>
  );
};

export default Review;