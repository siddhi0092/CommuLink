import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

// Custom styled card
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 400, // Increased max width for the card
  margin: '16px', // Add margin around the card
  borderRadius: '16px', // Add border radius
  boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)', // Enhanced shadow
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out', // Smooth transitions
  '&:hover': {
    transform: 'scale(1.05)', // Scale up on hover
    boxShadow: '0px 12px 32px rgba(0, 0, 0, 0.2)', // Enhanced shadow on hover
  },
}));

const CardComponent = ({ image, title, description, buttonText, onClick }) => {
  return (
    <StyledCard>
      {/* Card Image */}
      <CardMedia
        component="img"
        height="200" // Increased height for the image
        image={image}
        alt={title}
        sx={{ borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }} // Rounded corners for the image
      />
      {/* Card Content */}
      <CardContent sx={{ padding: '24px' }}> {/* Increased padding */}
        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '16px' }}>
          {description}
        </Typography>
      </CardContent>
      {/* Card Button */}
      <Button
        variant="contained"
        color="primary"
        sx={{ 
          margin: '16px', 
          borderRadius: '8px', // Rounded button
          fontWeight: 'bold', // Bold text
          padding: '8px 24px', // Increased padding
          backgroundColor: '#4167d4', // Custom button color
          '&:hover': {
            backgroundColor: '#344784', // Darker color on hover
          },
        }}
        onClick={onClick} // Handle button click
      >
        {buttonText}
      </Button>
    </StyledCard>
  );
};

export default CardComponent;