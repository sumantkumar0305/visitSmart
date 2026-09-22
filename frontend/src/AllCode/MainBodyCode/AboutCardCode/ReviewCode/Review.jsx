import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import ReviewHelper from "./ReviewHelper"
import AlertMsg from '../../../AlertMsg';
import ReviewResult from "./ReviewResult";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import ReviewBtn from "./ReviewBtn";
import ReviewEdit from "./ReviewEdit";
import { BASE_URL } from "../../middleware";
import { useUser } from "../../../context/UserContext";

export const fetchReviews = async (ID) => {
    if (!ID) return [];
    try {
      const response = await axios.get(`${BASE_URL}/site/review/fetch/${ID}`);
      const reversedReviews = response.data.slice().reverse();
      return reversedReviews; // ✅ Return the data to the component
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return [];
    }
  };

const Review = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser(); // already loaded once by the shared context - no extra fetch here
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

  const ID = location.state?.ID;
  
  const loadReviews = async () => {
    if (!ID) return;
  
    try {
      const data = await fetchReviews(ID);
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading reviews:", err);
      setReviews([]);
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
      const response = await axios.post(`${BASE_URL}/site/review/delete/${reviewid}`);
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
  // ✅ 1. Validate rating & comment
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
    const authorId = user?._id;

    if (!authorId) {
      setAlert({
        type: "error",
        message: "Please log in first then submit the review",
      });
      sessionStorage.setItem("Path", location.pathname);

      setTimeout(() => {
        navigate("/login/form");
      }, 1500);   
      setLoading(false);
      return;
    }

    const response = await axios.post(`${BASE_URL}/site/review/save/${ID}/${authorId}`,newReview);
    const { type, message } = response.data;
    setAlert({ type, message });

    setRating(0);
    setComment("");
    await loadReviews(); // ensure reviews reload before setting loading to false

  } catch (error) {
    console.error("Review submission failed:", error);

    setAlert({
      type: "error",
      message:
        error.response?.data?.message ||
        error.message ||
        "An error occurred while submitting your review.",
    });
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  if (!ID) return;
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
          backgroundColor: "#ffffff",
          borderTop: "6px solid #0d47a1",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          textAlign="center"
          fontWeight="bold"
          sx={{
            color: "#0d47a1",
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
            <CircularProgress size={28} sx={{ color: "#ffc107" }} />
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
