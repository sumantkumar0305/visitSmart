import { useState } from 'react';
import { Box, Typography, CardContent, CardMedia, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader';
import axios from 'axios';

export default function HelperCard({ data }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const ID = data._id;

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://visitsmart-backend.onrender.com/site/data/find/by/${ID}`);
      const aboutSiteDate = response.data;

      setTimeout(() => {
        navigate('/about/card/in/details', { state: { aboutSite: aboutSiteDate } });
      }, 1500);
    } catch (err) {
      console.log(err);
      setLoading(false); // Stop loader on error
    }
  };

  return (
    <Card
      sx={{
        // Responsive Width: 100% on mobile, max 400px on tablet/desktop
        width: '100%',
        maxWidth: { xs: '100%', sm: 400, md: 420 },
        mx: 'auto', // Centers the card
        borderRadius: 3,
        boxShadow: 4, 
        overflow: 'hidden',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.02)',
          cursor: 'pointer'
        },
      }}
      onClick={handleClick}
    >
      {loading && <Loader /> }
      
      <CardMedia
        component="img"
        // Responsive Height: Shorter on mobile (200px), taller on desktop (300px)
        sx={{ 
          height: { xs: 200, sm: 250, md: 300 }, 
          objectFit: 'cover' 
        }}
        image={data.image[0]}
        alt={data.title}
      />

      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: { xs: 1.5, sm: 2 }, // Slightly less padding on mobile
          py: 1.5,
        }}
      >
        <Typography
          sx={{
            // Responsive Font Size
            fontSize: { xs: 20, sm: 24 },
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          {data.title}
        </Typography>
      </CardContent>

      <CardContent
        sx={{
          flexGrow: 1, 
          px: { xs: 1.5, sm: 2 },
          py: 1.5,
          overflow: 'hidden',
        }}
      >
        <Typography
          sx={{
            color: '#555',
            fontSize: { xs: 14, sm: 16 }, // Smaller text on mobile
            // Optional: Limit description lines on mobile to save space
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: { xs: 3, md: 5 }, 
          }}
        >
          {data.description}
        </Typography>
      </CardContent>

      <CardContent sx={{ px: { xs: 1.5, sm: 2 } }}>
        <Typography sx={{ fontSize: { xs: 20, sm: 25 }, fontWeight: '600' }}>
           Location 
        </Typography>
        
        <Box sx={{ 
            display: 'flex', 
            gap: { xs: 2, sm: 3 }, 
            flexWrap: 'wrap', // Allows wrapping if state/city names are long
            mt: 1 
        }}>
            <Typography variant="body1" sx={{ fontSize: { xs: 14, sm: 16 } }}>
                <b>State: </b> {data.state}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: 14, sm: 16 } }}>
                <b>City: </b> {data.city}
            </Typography>
        </Box>
        
        <Typography sx={{ fontSize: { xs: 13, sm: 15 }, mt: 0.5, color: 'text.secondary' }}>
            {data.location}
        </Typography>
      </CardContent>  
    </Card>
  );
}
