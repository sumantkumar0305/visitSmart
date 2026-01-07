import React, { useState } from "react";
import { Box } from "@mui/material";
import ArrowIcon from "./ArrowIcon";

export default function ImageSlider({ image = [], title }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalImages = image.length;

  const handleRightClick = () => {
    setCurrentIndex(prev =>
      (prev + 1) % totalImages
    );
  }; 

  const handleLeftClick = () => {
    setCurrentIndex(prev =>
      (prev - 1 + totalImages) % totalImages
    );
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: { xs: "100%", md: "60%" },
        height: { xs: "18rem", sm: "22rem", md: "28rem", lg: "32rem" },
        borderRadius: 2,
        boxShadow: 3,
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={image[currentIndex]}
        alt={title}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: 2,
          transition: "all 0.5s ease-in-out",
        }}
      />

      {totalImages > 1 && (
        <ArrowIcon
          handleLeftClick={handleLeftClick}
          handleRightClick={handleRightClick}
        />
      )}
    </Box>
  );
}
