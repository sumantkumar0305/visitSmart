// src/api/reviews.js
import axios from "axios";

// Single source of truth for the backend origin so it only needs to change
// in one place instead of being copy/pasted into every component.
export const BASE_URL = "http://localhost:8000";

export const fetchReviews = async (ID) => {
  try {
    const response = await axios.get(`${BASE_URL}/site/review/fetch/${ID}`);
    const reversedReviews = response.data.slice().reverse();
    return reversedReviews; // ✅ Return the data to the component
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error; // rethrow so the caller can handle it
  }
};


export const fetchUserProfile = async()=>{
    try {
    const response = await axios.get(`${BASE_URL}/user/profile`, {
      withCredentials: true, // important!
    });
    return response.data; // ✅ more accurate
  } catch (err) {
    console.log("Profile check error:", err);
    return null;
  }
}
