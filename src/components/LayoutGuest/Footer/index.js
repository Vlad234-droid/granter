import React from "react";
import { Link } from "react-router-dom";

import "./style.scss";

const Footer = () => {
  return (
    <footer>
      <div className='wrapper'>
        <Link to=''>About Us</Link>
        <Link to=''>Terms and Conditions</Link>
        <Link to=''>Need Help?</Link>
      </div>
    </footer>
  );
};

export default Footer;
