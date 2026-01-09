import React, { useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Container,
  Paper,
  Alert
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignupInput from "../CommonCode/InputText";
import SignupPassword from "../CommonCode/InputPassword";
import SignupBtn from "../CommonCode/Button";
import SignupBottom from "./SignupBottom";
import AlertMsg from "../../AlertMsg"; 
import PhoneNumber from "./PhoneNumber"; 
import { fetchUserProfile } from "../../MainBodyCode/middleware";

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // const [countryCode, setCountryCode] = useState('+91');
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    countryCode: "+91",
    phone: "",
    password: "",
  });
  const [alert, setAlert] = useState({
    type: "",
    message: ""
  });

  // handle input change
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev)=>({
        ...prev,
        [name]: value
    }));
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
      try{
        console.log(formData);
        const response = await axios.post("https://visitsmart-backend.onrender.com/user/signup", formData, { withCredentials: true });

        const { type, message } = response.data;

        setAlert({
          type: type,
          message: message
        })

        setFormData({
          username: "",
          email: "",
          phone: "",
          password: ""
        });
        
        setTimeout(()=>{
          navigate("/", { state: { alert: { type, message } } });
        }, 1500);
    }catch(err){
        console.log(err);
        setAlert({
          type: err.response?.data?.type || "error",
          message: err.response?.data?.message || "you are not signup(Some error is occure)"
        });
        setLoading(false);
    }
  };

  return (
    <>
    {alert.message && <AlertMsg alert={alert} />}
    <Container component="main" maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <PersonAddAlt1Icon />  
          </Avatar>
          <Typography component="h1" variant="h5" fontWeight="bold">
            Create Your VisitSmart Account
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Join us to explore heritage smartly
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: "100%" }}>
            <SignupInput formData={formData} handleChange={handleChange} ID="username" label="Enter Username" name="username" type="text" icon={AccountCircleIcon} />
            <SignupInput formData={formData} handleChange={handleChange} ID="email" label="Enter Email" name="email" type="email" icon={EmailIcon} />
            <PhoneNumber handleChange={handleChange} formData={formData} />
            <SignupPassword formData={formData} handleChange={handleChange} name="password" ID="password" label="Enter Password" />

            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <CircularProgress size={28} color="primary" />
                </Box>
              ) : (
                <SignupBtn text="Sign up" />
              )}

            <SignupBottom href="/login/form" />
          </Box>
        </Box>
      </Paper>
    </Container>
    </>
  );
}
