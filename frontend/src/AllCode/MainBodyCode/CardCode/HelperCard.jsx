import { useState } from 'react';
import { Box, Typography, CardContent, CardMedia, Card } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader';
import axios from 'axios';

export default function HelperCard({ data }) {
  const navigate = useNavigate();
  const [rating, setRating] = useState(4.5); // Example rating
  const [loading, setLoading] = useState(false);

  const handleClick=async()=>{
    setLoading(true)
    try{
      const ID = data._id
      const response = await axios.get(`http://localhost:8080/site/data/find/by/${ID}`);

      const aboutSiteDate = response.data;

      setTimeout(()=>{
        navigate('/about/card/in/details', {state: {aboutSite: aboutSiteDate}});
      }, 1500);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <Card
      sx={{
        minWidth: 400,
        maxWidth: 420,
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
      {loading && <Loader />  }
      <CardMedia
        component="img"
        height="300"
        image={data.image}
        alt={data.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          py: 1.5,
        }}
      >
        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          {data.title}
        </Typography>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: 2,
            py: 0.75,
            bgcolor: '#ff9800',
            color: 'white',
            fontSize: 26,
            fontWeight: 'bold',
            borderRadius: '30px',
            boxShadow: 2,
            gap: 0.5,
          }}
        >
          {rating}
          <StarBorderIcon sx={{ fontSize: 26 }} />
        </Box>
      </CardContent>

      <CardContent
        sx={{
          flexGrow: 1, 
          px: 2,
          py: 1.5,
          overflow: 'hidden',
        }}
      >
        <Typography
          sx={{
            color: '#555',
            fontSize: 16,
          }}
        >
          {data.description}
        </Typography>
      </CardContent>

      <CardContent>
        <Typography sx={{fontSize: 25}}><b>Location</b> </Typography>
        <Box sx={{display: 'flex', gap: 3}}>
            <Typography>
                <b>State: </b> {data.state}
            </Typography>
            <Typography>
                <b>City: </b> {data.city}
            </Typography>
        </Box>
        <Typography>{data.location}</Typography>
      </CardContent>  
    </Card>
  );
}
