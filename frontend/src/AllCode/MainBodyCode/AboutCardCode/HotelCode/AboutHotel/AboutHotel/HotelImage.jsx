import { Box, IconButton } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

export default function HotelImage({imageArr, hotelData, handlePrev, handleNext, imgCount}){
    return(
        <Box
          sx={{
            width: "100%",
            height: { xs: 280, md: 480 },
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            mb: 4,
            position: "relative",
          }}
        >
          {/* Hotel Image */}
          <img
            src={imageArr[imgCount]}
            alt={`${hotelData.name} main`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "all 0.5s ease-in-out",
            }}
          />

          {/* Left Arrow */}
          <IconButton
            onClick={handlePrev}
            sx={{
              position: "absolute",
              top: "50%",
              left: 20,
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255,255,255,0.7)",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.9)",
                transform: "translateY(-50%) scale(1.1)",
              },
              transition: "0.3s",
            }}
          >
            <KeyboardArrowLeftIcon sx={{ fontSize: 35, color: "#1e3a8a" }} />
          </IconButton>

          {/* Right Arrow */}
          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              top: "50%",
              right: 20,
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255,255,255,0.7)",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.9)",
                transform: "translateY(-50%) scale(1.1)",
              },
              transition: "0.3s",
            }}
          >
            <ChevronRightIcon sx={{ fontSize: 35, color: "#1e3a8a" }} />
          </IconButton>

          {/* Image Counter */}
          <Box
            sx={{
              position: "absolute",
              bottom: 10,
              right: 15,
              bgcolor: "rgba(0,0,0,0.5)",
              color: "white",
              px: 1.5,
              py: 0.3,
              borderRadius: 2,
              fontSize: 14,
            }}
          >
            {imgCount + 1}/{imageArr.length}
          </Box>
        </Box>
    )
}