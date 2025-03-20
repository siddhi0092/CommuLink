import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Events from './pages/Events';
import Groups from './pages/Groups';
import Profile from './pages/Profile';
import Blogs from './pages/Blogs';
import Business from './pages/Business';
import ProblemForum from './pages/ProblemForum';
import Navbar from './components/Navbar'; // Import Navbar component
import Footer from './components/Footer';
import SignIn from './pages/Signin';
import Signup from './pages/Signup';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons

function App() {
  return (
    <Router>
      <Navbar /> {/* Render Navbar component */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/business" element={<Business />} />
        <Route path="/problem-forum" element={<ProblemForum />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer /> 
    </Router>
  );
}

export default App;
