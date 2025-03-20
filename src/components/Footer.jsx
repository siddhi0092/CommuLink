import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white mt-5">
      <div className="container-fluid p-5">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="mb-3">About Us</h5>
            <p>CommuLink is a platform dedicated to connecting communities and fostering collaboration.</p>
          </div>
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Home</a></li>
              <li><a href="#" className="text-white text-decoration-none">Business Forum</a></li>
              <li><a href="#" className="text-white text-decoration-none">Groups</a></li>
              <li><a href="#" className="text-white text-decoration-none">Events</a></li>
              <li><a href="#" className="text-white text-decoration-none">Blogs</a></li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="mb-3">Contact Info</h5>
            <ul className="list-unstyled">
              <li><i className="bi bi-geo-alt me-2"></i> 123 Community Street, City, Country</li>
              <li><i className="bi bi-telephone me-2"></i> +123 456 7890</li>
              <li><i className="bi bi-envelope me-2"></i> info@commulink.com</li>
            </ul>
            <div className="mt-3">
              <a href="#" className="text-white me-3"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white me-3"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-white me-3"><i className="bi bi-linkedin"></i></a>
              <a href="#" className="text-white me-3"><i className="bi bi-instagram"></i></a>
            </div>
          </div>
        </div>
        <div className="text-center mt-4 pt-3 border-top">
          <p className="mb-0">&copy; 2025 CommuLink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;