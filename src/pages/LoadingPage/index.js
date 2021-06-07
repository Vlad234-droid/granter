import React from 'react';

import logo from '../../assets/img/header-logo.svg';

import './style.scss';

const LoadingPage = () => {
  return (
    <div className="loading-page">
      <div className="loading-page__text">We’re loading your account, just give us few seconds.</div>
      <div className="progress-materializecss">
        <div className="indeterminate"></div>
      </div>
    </div>
  );
};

export default LoadingPage;
