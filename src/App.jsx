// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Events from './pages/Events';
// import Groups from './pages/Groups';
// import Profile from './pages/Profile';
// import Blogs from './pages/Blogs';
// import Business from './pages/Business';
// import ProblemForum from './pages/ProblemForum';
// import Navbar from './components/Navbar'; // Import Navbar component
// import Footer from './components/Footer';
// import SignIn from './pages/Signin';
// import Signup from './pages/Signup';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons

// function App() {
//   return (
//     <Router>
//       <Navbar /> {/* Render Navbar component */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/events" element={<Events />} />
//         <Route path="/groups" element={<Groups />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/blogs" element={<Blogs />} />
//         <Route path="/business" element={<Business />} />
//         <Route path="/problem-forum" element={<ProblemForum />} />
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/signup" element={<Signup />} />
//       </Routes>
//       <Footer /> 
//     </Router>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // For resetting CSS and applying background colors
import Home from './pages/Home';
import Events from './pages/Events';
import Groups from './pages/Groups';
import Profile from './pages/Profile';
import Blogs from './pages/Blogs';
import Business from './pages/Business';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignIn from './pages/Signin';
import Signup from './pages/Signup';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons

// Create light and dark themes
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4167d4', // Customize primary color
    },
    background: {
      default: '#ffffff', // Light background
      paper: '#f5f5f5', // Light paper background
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#344784', // Customize primary color
    },
    background: {
      default: '#121212', // Dark background
      paper: '#1e1e1e', // Dark paper background
    },
  },
});

// Create a context for theme mode
export const ThemeContext = React.createContext();

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline /> {/* Normalize CSS and apply background color */}
        <Router>
          <Navbar /> {/* Render Navbar component */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/business" element={<Business />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <Footer />
        </Router>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;