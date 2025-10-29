import { Box, Rating, Typography, TextField, Button } from "@mui/material"
import StarIcon from "@mui/icons-material/Star";

export default function Comment({ handleRatingChange, handleCommentChange, comment, rating, }){
    return(
        <>
            <Box textAlign="center" sx={{ mb: 3 }}>
          <Typography
            component="legend"
            sx={{ fontSize: "1.1rem", fontWeight: 600, color: "#000000" }}
          >
            Your Rating
          </Typography>
          <Rating
            name="user-rating"
            value={rating}
            onChange={handleRatingChange}
            size="large"
            precision={1}
            icon={<StarIcon fontSize="inherit" htmlColor="#e8eb34" />}
            emptyIcon={<StarIcon fontSize="inherit" htmlColor="white" />}
          />
        </Box>

        {/* 💬 Comment Section */}
        <TextField
          required
          label="Wtite Your Comment"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          variant="outlined"
          value={comment}
          onChange={handleCommentChange}
          sx={{
            backgroundColor: "#fff",
            borderRadius: 1,
          }}
        />
        </>
    )
}