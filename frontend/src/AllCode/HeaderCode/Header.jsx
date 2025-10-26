import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Drawer, List} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ButtonCode from './ButtonCode';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
// import SearchBar from '../MainBodyCode/MainPageCode';

const Header = () => {
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleLoginClick =()=>{
    navigate('/login/form');
  }

  const handleSignupClick =()=>{
    navigate('/signup/form');
  }

  const handleAboutClick =()=>{
    navigate('/show/about/page');
  }

  const handleHomeClick =()=>{
    navigate('/');
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
            Janshayak
          </Typography>

          {/* Desktop Buttons */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <ButtonCode label="Home" handleOnClick={handleHomeClick} />
            <ButtonCode label="About" handleOnClick={handleAboutClick} />
            {/* <ButtonCode label="Filter" handleOnClick={} /> */}
            <ButtonCode label="Login" handleOnClick={handleLoginClick} />
            <ButtonCode label="Sign up" handleOnClick={handleSignupClick} />
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
              <ButtonCode label="Home"/>
            </Box>

            <Box sx={{mb: 3}}>
              <ButtonCode label="About"/>
            </Box>

            <Box sx={{mb: 3}}>
              <ButtonCode label="Login"/>
            </Box>

            <Box sx={{mb: 3}}>
              <ButtonCode label="Sign up"/>
            </Box>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;