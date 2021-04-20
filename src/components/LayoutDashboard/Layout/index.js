import React from "react";
import { Layout } from "antd";
import Aside from "../Aside";
import Header from "../Header";

import "./style.scss";

const LayoutBoard = ({ children, className }) => {
  return (
    <div className={`app-dashboard ${className}`}>
      <Aside />
      <Header />
      <Layout.Content className='main-content'>
        <div className='dashboard-wrapper'>{children}</div>
      </Layout.Content>
    </div>
  );
};

export default LayoutBoard;
