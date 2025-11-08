import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Paper } from "@mui/material";
import ArrowIcon from "./ArrowIcon";
import Location from "./Location";
import AboutSite from "./AboutSite";
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function AboutCard() {
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const aboutSite = location.state?.aboutSite;  
  const [siteData, setSiteData] = useState(aboutSite); // store live site data
  
  const fetchSiteData = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/site/data/find/by/${id}`);
      setSiteData(res.data); // refresh with latest site data
    } catch (err) {
      console.error("Error fetching site data:", err);
    }
  };

  const fetchRating = async (reviews) => {
    if (!reviews || reviews.length === 0) {
      setRating(0);
      return;
    }

    let sum = 0;
    for (let review of reviews) {
      const reviewRes = await axios.get(`http://localhost:8080/find/singal/review/${review._id}`);
      sum += reviewRes.data.rating;
    }

    const avg = Math.ceil((sum / reviews.length) * 10) / 10;
    setRating(avg);
  };

  useEffect(() => {
    // Always get latest site data
    if (aboutSite?._id) {
      fetchSiteData(aboutSite._id);
    }
  }, [aboutSite]);

  useEffect(() => {
    // Run whenever siteData changes
    if (siteData?.review) {
      fetchRating(siteData.review);
    }
  }, [siteData]);



  // 🖼️ State for image slider
  const image = [aboutSite?.image, aboutSite?.image2, aboutSite?.image3, aboutSite?.image4]// support single or multiple
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleRightClick =()=>{
    setCurrentIndex((prev) => {
    if (prev < 3) {
      return prev + 1;
    } else {
      window.alert("You've reached the last image!");
      return prev;
    }
    });
  }

  const handleLeftClick =()=>{
    setCurrentIndex((prev) => {
    if (prev > 0) {
      return prev -1;
    } else {
      window.alert("You've reached the First image!");
      return prev;
    }
    });
  } 

  const handleReviewClick =()=>{
    navigate('/show/site/review/page', {state: {ID: aboutSite?._id}});
  }

  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: "100%",
        margin: "auto",
        mt: { xs: 1, sm: 2 },
        p: { xs: 2, sm: 3 },
        borderRadius: 2,
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Header Section */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
        gap={2}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{
            ml: { xs: 0, sm: 5 },
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
          }}
        >
          {aboutSite?.title}
        </Typography>

        <Box
          onClick={handleReviewClick}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            px: { xs: 2, sm: 3 },
            py: { xs: 0.5, sm: 0.75 },
            bgcolor: "#ff9800",
            color: "white",
            fontSize: { xs: 20, sm: 24 },
            fontWeight: "bold",
            borderRadius: "30px",
            boxShadow: 2,
            gap: 0.5,
            alignSelf: { xs: "flex-start", sm: "center" },
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              cursor: "pointer",
              transform: "scale(1.05)",
            },
          }}
        >
          {rating}
          <StarBorderIcon sx={{ fontSize: { xs: 22, sm: 26 } }} />
        </Box>
      </Box>

      {/* Content Section */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignItems="flex-start"
        gap={{ xs: 4, md: 8, lg: 10 }}
        p={{ xs: 1, sm: 2, md: 3 }}
      >
        {/* 🖼️ Image with slider controls */}
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
            alt={aboutSite?.title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 2,
              transition: "all 0.5s ease-in-out",
            }}
          />

          {/* Arrows only if multiple images */}
          {image.length > 1 && (
            <ArrowIcon
              handleLeftClick={handleLeftClick}
              handleRightClick={handleRightClick}
            />
          )}
        </Box>

        {/* 📝 About & Location Section */}
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          gap={{ xs: 2, sm: 3 }}
          width="100%"
        >
          <AboutSite aboutSite={aboutSite} />
          <Location aboutSite={aboutSite} />
        </Box>
      </Box>
    </Paper>
    );
}
