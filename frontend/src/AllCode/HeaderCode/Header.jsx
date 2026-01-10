import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import { fetchUserProfile } from '../MainBodyCode/middleware';
import UserProfile from './UserProfile';
import MobileDrawer from './MobileDrawer';
import DesktopNav from './DesktopNav';

const Header = () => {
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    type: "",
    message: ""
  });

  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

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
    setUser(loggedIn.user)
  };

  const location = useLocation();
  useEffect(() => {
    checkUserProfile();
  }, [location.pathname]);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleLoginClick =()=>{
    console.log(user);
    navigate('/login/form');
  }

  const handleSignupClick =()=>{
    navigate('/signup/form');
  }

  const handleAboutClick =async(e)=>{
    navigate('/about/web/page');
  }  

  const handleHomeClick =()=>{
    navigate('/');
  }

  const handleLogoutClick =async()=>{
    try{
      const response = await axios.post("https://visitsmart-backend.onrender.com/user/logout", {}, { withCredentials: true });
      const { type, message } = response.data;
      sessionStorage.removeItem("userId");
      setDrawerOpen(false); // 👈 close drawer
      setIsLogin(false);
      setUser(null);
      // checkUserProfile();    
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
          <DesktopNav 
          handleAboutClick={handleAboutClick}
          handleHomeClick={handleHomeClick}
          handleLoginClick={handleLoginClick}
          handleSignupClick={handleSignupClick}
          isLogin={isLogin}
          user={user}
          handleProfileOpen={handleProfileOpen}
          />

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
      <MobileDrawer 
      drawerOpen={drawerOpen} 
      toggleDrawer={toggleDrawer}
      handleHomeClick={handleHomeClick}
      handleAboutClick={handleAboutClick}
      handleLoginClick={handleLoginClick}
      handleSignupClick={handleSignupClick}
      user={user}
      isLogin={isLogin}
      handleLogoutClick={handleLogoutClick}
      />
      <UserProfile 
      anchorEl={anchorEl} 
      handleProfileClose={handleProfileClose} 
      user={user} 
      handleLogoutClick={handleLogoutClick} 
      />
    </>
  );
};

export default Header;
