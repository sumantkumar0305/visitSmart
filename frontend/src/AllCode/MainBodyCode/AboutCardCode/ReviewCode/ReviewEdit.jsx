import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, Rating, TextField, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';

export default function ReviewEdit({ editReview, setIsEdit, fetchReviews }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  // When editReview changes, update the fields
  useEffect(() => {
    if (editReview) {
      setRating(editReview.rating || 0);
      setComment(editReview.comment || '');
    }
  }, [editReview]);

  const handleCommentChange =(e)=>{
    setComment(e.target.value);
  }
  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const ID = editReview._id;
  // Optional: handle submit for editing
  const handleSubmit = async() => {
    try{
        const reviewMsg = {
                rating,
                comment
        };

        console.log(reviewMsg);

        const response = await axios.put(`http://localhost:8080/site/review/edit/${ID}`, reviewMsg);
        setIsEdit(false);
        fetchReviews();
    }catch(err){
        console.log(err);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: { xs: '90%', sm: 500 },
        margin: 'auto',
        mt: { xs: 2, sm: 4 },
        backgroundColor: '#c026d3',
        color: 'white',
        p: { xs: 2, sm: 4 },
        borderRadius: 4,
        boxShadow:
          '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 1.5, sm: 2 },
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          pb: 1,
          borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
          fontSize: { xs: '1.5rem', sm: '2rem' },
        }}
      >
        Edit Your Review
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 2,
        }}
      >
        <Typography
          variant="h6"
          component="legend"
          sx={{ mb: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}
        >
          Your Rating
        </Typography>
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={handleRatingChange}
          size="large"
          emptyIcon={
            <StarIcon
              style={{ color: 'white' }}
              fontSize="inherit"
            />
          }
          sx={{
            '& .MuiRating-iconFilled': {
              color: 'red',
            },
            '& .MuiRating-iconEmpty': {
              color: 'rgba(255,255,255,0.7)',
            },
          }}
        />
      </Box>

      <TextField
        id="outlined-multiline-static"
        multiline
        rows={5}
        value={comment}
        onChange={handleCommentChange}
        variant="filled"
        fullWidth
        InputProps={{
          sx: {
            backgroundColor: 'white',
            borderRadius: 2,
            '&:hover': {
              backgroundColor: '#f7f7f7',
            },
            '&.Mui-focused': {
              backgroundColor: 'white',
            },
          },
        }}
        InputLabelProps={{
          sx: {
            color: '#4a4a4a',
            '&.Mui-focused': {
              color: '#c026d3',
            },
          },
        }}
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          mt: 1,
        }}
      />

      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          backgroundColor: '#f59e0b',
          color: 'white',
          fontWeight: 'bold',
          fontSize: { xs: '0.9rem', sm: '1rem' },
          py: { xs: 1, sm: 1.5 },
          borderRadius: 50,
          mt: 2,
          width: { xs: '100%', sm: 'auto' },
          alignSelf: { xs: 'stretch', sm: 'center' },
          '&:hover': {
            backgroundColor: '#d97706',
          },
        }}
      >
        Update Review
      </Button>
    </Box>
  );
}
