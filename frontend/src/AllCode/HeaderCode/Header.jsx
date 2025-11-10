import React, { useEffect } from 'react';
import { useNavigationType } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, IconButton, Drawer, List} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ButtonCode from './ButtonCode';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { fetchUserProfile } from '../MainBodyCode/middleware';
// import SearchBar from '../MainBodyCode/MainPageCode';

const Header = () => {
  // const location = useLocation();
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: ""
  });

  const checkUserProfile = async () => {
    const loggedIn = await fetchUserProfile();
    if (!loggedIn || !loggedIn.user) {
      setIsLogin(false);
      sessionStorage.removeItem("userId"); // optional cleanup
      return;
    }
    // If valid user data is found, save it
    sessionStorage.setItem("userId", loggedIn.user._id);
    setIsLogin(loggedIn.isAuthenticated);
  };

  const location = useLocation();
  useEffect(()=>{
  checkUserProfile();
  }, [location.pathname]);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleLoginClick =()=>{
    navigate('/login/form');
  }

  const handleSignupClick =()=>{
    navigate('/signup/form');
  }

  const handleAboutClick =async(e)=>{
    navigate('/');
  }  

  const handleHomeClick =()=>{
    navigate('/');
  }

  const handleLogoutClick =async()=>{
    try{
      const response = await axios.post("http://localhost:8080/user/logout", {}, { withCredentials: true });
      const { type, message } = response.data;
      sessionStorage.removeItem("userId");
      checkUserProfile();    
      setAlert({
        type: type,
        message: message
      });     
      navigate("/", { state: { alert: { type, message } } });
    }catch(err){
      console.log(err);
    }
  }

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          pt: { xs: 2, sm: 3 },
          pb: { xs: 2, sm: 3 },
          backgroundColor: '#0d47a1',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          borderBottom: '4px solid #ffc107',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {/* Title */}
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 'bold',
              letterSpacing: 1,
              color: '#fff',
              fontFamily: 'Roboto, sans-serif',
              textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
              flexGrow: 1,
            }}
          >
            Visits Mart
          </Typography>

          {/* Desktop Buttons */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <ButtonCode label="Home" handleOnClick={handleHomeClick} />
            <ButtonCode label="About" handleOnClick={handleAboutClick} />
            {!isLogin ? (
              <>
                <ButtonCode label="Login" handleOnClick={handleLoginClick} />
                <ButtonCode label="Sign up" handleOnClick={handleSignupClick} />
              </>
            ) : (
              <ButtonCode label="Logout" handleOnClick={handleLogoutClick} />
            )}

          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 150 }} onClick={toggleDrawer(false)}>
          <List>
            <Box sx={{mb: 3}}>
              <ButtonCode label="Home" handleOnClick={handleHomeClick} />
            </Box>

            <Box sx={{mb: 3}}>
              <ButtonCode label="About" handleOnClick={handleAboutClick} />
            </Box>

            {!isLogin ? (
              <>
                <Box sx={{mb: 3}}>
                  <ButtonCode label="Login" handleOnClick={handleLoginClick} />
                </Box>
                <Box sx={{mb: 3}}>
                  <ButtonCode label="Sign up" handleOnClick={handleSignupClick} />
                </Box>
              </>
            ) : (
              <Box sx={{mb: 3}}>
                <ButtonCode label="Log out" handleOnClick={handleLogoutClick} />
              </Box>
            )}

      
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;



  // const location = useLocation();
  // useEffect(()=>{
  // checkUserProfile();
  // }, [location.pathname]);