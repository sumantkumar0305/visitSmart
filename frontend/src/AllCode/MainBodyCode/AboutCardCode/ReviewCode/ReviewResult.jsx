import { Box, Typography, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export default function ReviewResult({reviews}){
    return(
        <>
        {reviews.map((review, index) => (
            <Box
              key={review.id}
              sx={{
                mb: 3,
                p: 2,
                border: "1px solid #ffe0b2",
                borderRadius: 2,
                backgroundColor: index % 2 === 0 ? "#fff8ef" : "#fff",
                boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                {/* Reviewer name */}
                <Typography variant="subtitle1" fontWeight="bold">
                  by Sumant
                </Typography>

                {/* Rating value + stars */}
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography fontWeight="bold" color="#333">
                    {review.rating}
                  </Typography>
                  <Rating
                    value={review.rating}
                    readOnly
                    precision={1}
                    icon={<StarIcon fontSize="inherit" htmlColor="#eb8934" />} // bright gold
                    emptyIcon={<StarIcon fontSize="inherit" htmlColor="#fff" />}
                  />
                </Box>
              </Box>


              <Typography
                variant="body1"
                sx={{
                  mt: 1.5,
                  fontStyle: "italic",
                  color: "#555",
                  lineHeight: 1.6,
                }}
              >
                {review.comment}
              </Typography>
            </Box>
          ))}
        </>
    );
}