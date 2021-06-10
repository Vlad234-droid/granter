import React from 'react';
import './style.scss';
import { GranterLogo, DevicesOther } from '../icons';
import { Link } from 'react-router-dom';

const Plug = () => {
  return (
    <div className="fix_plug">
      <div className="wrapper_plug">
        <header>
          <div className="logo">
            <GranterLogo />
          </div>
          <h1>Granter</h1>
        </header>
        <div className="devices_info">
          <div className="devices_other">
            <DevicesOther />
          </div>
          <div className="info">
            <h3>Please, use your computer to work with Granter.</h3>
          </div>
        </div>
        <footer>
          <div className="wrapper">
            <Link to="">About Us</Link>
            <Link to="">Terms and Conditions</Link>
            <Link to="">Need Help?</Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Plug;
