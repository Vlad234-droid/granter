import React from 'react';

import logo from '../../assets/img/header-logo.svg';

import './style.scss';

const LoadingPage = () => {
  return (
    <div className="loading-page">
      <div className="loading-page__loader">
        <img src={logo} alt="" />
      </div>
    </div>
  );
};

export default LoadingPage;
