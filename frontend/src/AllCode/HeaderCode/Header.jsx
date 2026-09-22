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
import { BASE_URL } from '../MainBodyCode/middleware';
import { useUser } from '../context/UserContext';
import UserProfile from './UserProfile';
import MobileDrawer from './MobileDrawer';
import DesktopNav from './DesktopNav';

const Header = () => {
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, isAuthenticated: isLogin, refreshUser, clearUser } = useUser();
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

  // The user's session can change after navigating (e.g. right after login/logout),
  // so re-check once per route change. This is the ONLY place that re-checks the
  // profile - other pages read the shared context instead of fetching it again.
  const location = useLocation();
  useEffect(() => {
    refreshUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      const response = await axios.post(`${BASE_URL}/user/logout`, {}, { withCredentials: true });
      const { type, message } = response.data;
      setDrawerOpen(false); // 👈 close drawer
      clearUser();
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
