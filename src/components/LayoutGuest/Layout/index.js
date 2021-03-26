import React from "react";
import { Layout } from "antd";
import Header from "../Header";
import Footer from "../Footer";

import "./style.scss";

const LayoutBoard = ({ children, className, mode }) => {
  return (
    <div className={`app-welcome ${className}`}>
      <Header mode={mode} />
      <Layout.Content className='main-content'>
        <div className='wrapper'>{children}</div>
      </Layout.Content>
      <Footer />
    </div>
  );
};

export default LayoutBoard;
