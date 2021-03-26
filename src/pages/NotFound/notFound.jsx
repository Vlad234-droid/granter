import React from 'react';
import './style.scss';

export default function () {
  return (
    <div className="ui container not-found">
      <div className="wrapper ui icon message">
        <i className="warning sign icon" />
        <div className="content">
          <div className="header">Page not found</div>
          <p>The page your are looking for does not exists</p>
        </div>
      </div>
    </div>
  );
}
