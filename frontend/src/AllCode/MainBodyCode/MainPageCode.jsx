import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import AlertMsg from "../AlertMsg";
import FilterCode from "./FilterSite/Filter";
import Card from "./CardCode/Card";  
import { Box, CircularProgress } from "@mui/material";
import { BASE_URL } from "./middleware";

export default function MainPageCode(){
   const [data, setData] = useState([]);
   const [alert, setAlert] = useState();
   const [loading, setLoading] = useState(true);
   const location = useLocation();
   const [searchResult, setSearchResult] = useState([]);
  
  useEffect(()=>{
    const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/site/data/find`);
      setData(response.data); 
    } catch (err) {
      console.log(err);
      setAlert({
        type: "error",
        message:
          "Could not load destinations. Please make sure the backend server is running and reachable.",
      });
    } finally {
      setLoading(false);
    }
  };
  fetchData();
  }, []);

  useEffect(() => {
    if (location.state?.alert) {
      setAlert(location.state.alert);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <Box>
      <FilterCode helpersData={data} setData={setSearchResult} />
      {alert && <AlertMsg alert={alert} />}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Card data={searchResult.length > 0 ? searchResult : data} />
      )}
    </Box>
  );
}
