import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import AlertMsg from "../AlertMsg";
import Search from "./Search"
import Card from "./CardCode/Card";
import { Box } from "@mui/material";

export default function MainPageCode(){
   const [data, setData] = useState([]);
  
    useEffect(()=>{
      const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/site/data/find");
        setData(response.data); // axios auto-parses JSON
      } catch (err) {
        console.log(err);
      } 
    };

    fetchData();
    }, []);

  const location = useLocation();
  const alert = location.state?.alert;

  return (
    <Box sx={{backgroundColor: "black"}}>
      <Search helpersData={data} />
      {alert && <AlertMsg alert={alert} />}
      <Card data={data} />
    </Box>
  );
}