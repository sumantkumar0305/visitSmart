// src/api/reviews.js
import axios from "axios";

export const fetchReviews = async (ID) => {
  try {
    const response = await axios.get(`https://visitsmart-backend.onrender.com/site/review/fetch/${ID}`);
    const reversedReviews = response.data.slice().reverse();
    return reversedReviews; // ✅ Return the data to the component
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error; // rethrow so the caller can handle it
  }
};


export const fetchUserProfile = async()=>{
    try {
    const response = await axios.get("https://visitsmart-backend.onrender.com/user/profile", {
      withCredentials: true, // important!
    });
    // console.log(response.data.user);
    return response.data; // ✅ more accurate
  } catch (err) {
    console.log("Profile check error:", err);
    return null;
  }
}
