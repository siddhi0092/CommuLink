import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import {
  Business as BusinessIcon,
  People as PeopleIcon,
  Event as EventIcon,
  Article as ArticleIcon,
  PersonAdd as PersonAddIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Custom styled search bar
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const Navbar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        background: '#28242c', // Gradient background
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
      }}
    >
      <Toolbar sx={{ padding: '4px 0' }}>
        {/* Brand with Tooltip */}
        <Tooltip title="Home" placement="bottom">
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              flexGrow: 0,
              backgroundColor: '#000000', // Vibrant for the brand
              color: 'white',
              padding: '6px 16px',
              borderRadius: '4px',
              fontWeight: 'bold',
              marginRight: '16px',
              fontSize: '1.25rem',
              '&:hover': {
                backgroundColor: '#fafafa', // Darker red on hover
                textDecoration: 'none',
                color: 'black'
              },
              textDecoration: 'none',
            }}
          >
            COMMULINK
          </Typography>
        </Tooltip>

        {/* Search Bar */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

        {/* Nav Links (Centered between Search Bar and Signin/Signup) */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexGrow: 1,
            justifyContent: 'center',
            gap: '24px', // Increased gap for better spacing
          }}
        >
          {/* Business Forum Link */}
          <Button
            component={Link}
            to="/business"
            color="inherit"
            startIcon={<BusinessIcon />}
            sx={{
              textTransform: 'none',
              fontSize: '0.875rem',
              color: 'white',
              '&:hover': {
                backgroundColor: '#1abc9c', // Teal hover effect
                color: 'white',
              },
            }}
          >
            Business Forum
          </Button>
          {/* Groups Link */}
          <Button
            component={Link}
            to="/Groups"
            color="inherit"
            startIcon={<PeopleIcon />}
            sx={{
              textTransform: 'none',
              fontSize: '0.875rem',
              color: 'white',
              '&:hover': {
                backgroundColor: '#3498db', // Blue hover effect
                color: 'white',
              },
            }}
          >
            Groups
          </Button>
          {/* Events Link */}
          <Button
            component={Link}
            to="/Events"
            color="inherit"
            startIcon={<EventIcon />}
            sx={{
              textTransform: 'none',
              fontSize: '0.875rem',
              color: 'white',
              '&:hover': {
                backgroundColor: '#9b59b6', // Purple hover effect
                color: 'white',
              },
            }}
          >
            Events
          </Button>
          {/* Blogs Link */}
          <Button
            component={Link}
            to="/Blogs"
            color="inherit"
            startIcon={<ArticleIcon />}
            sx={{
              textTransform: 'none',
              fontSize: '0.875rem',
              color: 'white',
              '&:hover': {
                backgroundColor: '#e67e22', // Orange hover effect
                color: 'white',
              },
            }}
          >
            Blogs
          </Button>
        </Box>

        {/* Signin/Signup Button (Pushed to the far right) */}
        <Box sx={{ marginLeft: 'auto' }}>
          <Button
            component={Link}
            to="/Signin"
            color="inherit"
            startIcon={<PersonAddIcon />}
            sx={{
              textTransform: 'none',
              fontSize: '0.875rem',
              color: 'white',
              '&:hover': {
                backgroundColor: '#27ae60', // Green hover effect
                color: 'white',
              },
            }}
          >
            Signin/Signup
          </Button>
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: 'block', md: 'none' }, marginLeft: 'auto' }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;