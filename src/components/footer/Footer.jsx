import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logos.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container row justify-content-around">
        <div className="explore col-lg-4">
          <h3>Explore</h3>
          <Link to="/">Resource</Link>
          <Link to="/">Blog</Link>
          <Link to="/">Document</Link>
        </div>
        <div className="explore col-lg-4">
          <h3>Community</h3>
          <Link to="/">Community Central</Link>
          <Link to="/">Support</Link>
          <Link to="/">Help</Link>
          <Link to="/">My Info</Link>
        </div>
        <div className="explore col-lg-4">
          <h3>Company</h3>
          <Link to="/">About Us</Link>
          <Link to="/">Partners</Link>
          <Link to="/">Customers</Link>
          <Link to="/">Contact Us</Link>
        </div>
      </div>
      <div className="copyright">
        <img src={Logo} alt="logo" />
        <p>&copy; 2022 Venue Reservation. All rights reserved.</p>
        <div className="social-links"></div>
      </div>
    </footer>
  );
};

export default Footer;
