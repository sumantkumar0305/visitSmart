import { useState, useEffect } from 'react';
import {
  Popover,
  Divider,
  Button,
  Stack,
  Box,
  Avatar,
  Typography,
  Dialog, 
  DialogTitle, 
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import axios from 'axios';

export default function UserProfile({
  anchorEl,
  handleProfileClose,
  user,
  handleLogoutClick
}) {
  const open = Boolean(anchorEl);
  const [isLoad, setIsLoad] = useState(false);
  const [formData, setFormData] = useState({
    userName: user?.username,
    DOB: user?.DOB,
    phoneNumber: user?.phoneNumber
  });

  // const [userName, setUserName] = useState(user?.userName);
  const [editPage, setEditPage] = useState(false);

  const openEdit = () =>{
    setEditPage(true);
  }

  const closeEdit = ()=>{
    setEditPage(false);
  }

  useEffect(() => {
    if (editPage && user) {
      setFormData({
        userName: user.username || "",
        DOB: user.DOB ? user.DOB.split("T")[0] : "",
        phoneNumber: user.phoneNumber || ""
      });
    }
  }, [editPage, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = (e) =>{
    e.preventDefault();
    setIsLoad(true)
    try{
      const userID = user._id;
      const res = axios.put(`http://localhost:8080/user/update/profile/${userID}`, formData, { withCredentials: true })

      console.log(res);
      closeEdit();
    }catch(err){
      console.log(err);
    }
  }

  return (
    <>
    <Popover  
      open={open}
      anchorEl={anchorEl}
      onClose={handleProfileClose}
      anchorOrigin={{
        vertical: 'bottom',  
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      PaperProps={{
        sx: {
          width: 270,
          p: 2,
          borderRadius: 3,
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
        },
      }}
    >
      <Stack spacing={1.5}>

        {/* USER INFO */}
        <Box textAlign="center">
          <Avatar
            sx={{
              width: 56,
              height: 56,
              mx: 'auto',
              mb: 1,
              bgcolor: 'primary.main',
              fontSize: 22,
              fontWeight: 600
            }}
          >
            {user?.username?.charAt(0)?.toUpperCase()}
          </Avatar>

          <Typography fontWeight={600}>
            {user?.username}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* ACTION BUTTONS */}
        <Button
          startIcon={<MailOutlineIcon />}
          fullWidth
          variant="text"
          sx={{
            justifyContent: 'flex-start',
            color: 'text.primary',
            textTransform: 'none',
            px: 1.5,
            '&:hover': { bgcolor: 'action.hover' }
          }}
        >
          Messages
        </Button>

        <Button
          startIcon={<ShoppingBagOutlinedIcon />}
          fullWidth
          variant="text"
          sx={{
            justifyContent: 'flex-start',
            color: 'text.primary',
            textTransform: 'none',
            px: 1.5,
            '&:hover': { bgcolor: 'action.hover' }
          }}
        >
          My Orders
        </Button>

        <Button
          startIcon={<EditOutlinedIcon />}
          fullWidth
          variant="text"
          onClick={openEdit}
          sx={{
            justifyContent: 'flex-start',
            color: 'text.primary',
            textTransform: 'none',
            px: 1.5,
            '&:hover': { bgcolor: 'action.hover' }
          }}
        >
          Edit Profile
        </Button>

        <Divider sx={{ my: 1 }} />

        <Button
          startIcon={<LogoutOutlinedIcon />}
          fullWidth
          variant="text"
          color="error"
          sx={{
            justifyContent: 'flex-start',
            textTransform: 'none',
            px: 1.5,
            '&:hover': { bgcolor: 'rgba(211,47,47,0.08)' }
          }}
          onClick={() => {
            handleProfileClose();
            handleLogoutClick();
          }}
        >
          Logout
        </Button>

      </Stack>
    </Popover>

    <Dialog
      open={editPage}
      onClose={closeEdit}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 }
      }}
    >
      <DialogTitle sx={{ fontWeight: 700, textAlign: "center" }}>
        ✏️ Update Your Profile
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2.5} mt={1}>
          <TextField
            label="User Name"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Date of Birth"
            name="DOB"
            type="date"
            value={formData.DOB}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={closeEdit} color="inherit">
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ px: 4, borderRadius: 2, textTransform: "none" }}
          onClick={handleEditSubmit}
        >
          {isLoad ? <CircularProgress color='white' /> : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
}