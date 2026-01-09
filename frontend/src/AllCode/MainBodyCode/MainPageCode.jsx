import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import AlertMsg from "../AlertMsg";
import FilterCode from "./FilterSite/Filter";
import Card from "./CardCode/Card";  
import { Box } from "@mui/material";

export default function MainPageCode(){
   const [data, setData] = useState([]);
   const [alert, setAlert] = useState();
   const location = useLocation();
   const [searchResult, setSearchResult] = useState([]);
  
  useEffect(()=>{
    const fetchData = async () => {
    try {
      const response = await axios.get("https://visitsmart-backend.onrender.com/site/data/find");
      setData(response.data); 
    } catch (err) {
      console.log(err);
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
      <Card data={searchResult.length > 0 ? searchResult : data} />
    </Box>
  );
}
