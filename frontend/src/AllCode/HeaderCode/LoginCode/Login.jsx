import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Typography,
  Container,
  Paper
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import LoginInput from "../CommonCode/InputText";
import LoginBtn from "../CommonCode/Button";
import LoginBottom from "./LoginBottom";
import LoginPassword from "../CommonCode/InputPassword";
import EmailIcon from '@mui/icons-material/Email';
import AlertMsg from "../../AlertMsg";
import { fetchUserProfile } from "../../MainBodyCode/middleware";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: ""
  });
  // const errorMsg = location.state?.alertMsg;

  // useEffect(()=>{
  //   setAlert({
  //     type: errorMsg.type,
  //     message: errorMsg.msg
  //   })
  // }, [errorMsg])
    

  // handle input change
  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
   ...prev,
    [name]: value
  }));
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      const response = await axios.post("http://localhost:8080/user/login", formData, { withCredentials: true });

      const { type, message } = response.data;

      setAlert({
        type: type,
        message: message
      });
      
      setFormData({
        email: "",
        password: ""
      });
      const path = sessionStorage.getItem("Path") || "/";
      sessionStorage.removeItem("Path");

      setTimeout(()=>{
        navigate(path, { state: { alert: { type, message } } });
      }, 1500);
    }catch(err){
        console.log(err);
        setAlert({
          type: "error",
          message:  err.response?.data?.message || "An error has occurred"
        });
        setLoading(false);
    }
  };

  return ( 
    <>
    {alert.type === "error" && <AlertMsg alert={alert} />}
    <Container
      component="main"
      maxWidth="xs"
      sx={{ mt: 8, mb: 4 }}
    >
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4 }}>
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" fontWeight="bold">
            Welcome to VisitSmart
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Please login to continue
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: "100%" }}>
            <LoginInput formData={formData} handleChange={handleChange} ID="email" label="Enter Email" name="email" type="email" icon={EmailIcon} />
            <LoginPassword formData={formData} handleChange={handleChange} name="password" ID="password" label="Enter Password" />

            {/* <LoginBtn text="Login" /> */}
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <CircularProgress size={28} color="primary" />
              </Box>
            ) : (
              <LoginBtn text="Login" />
            )}

            <LoginBottom href="/signup/form" />
          </Box>
        </Box>
      </Paper>
    </Container>
    </>
  );
}