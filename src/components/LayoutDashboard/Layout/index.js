import React from 'react';
import { Layout } from 'antd';
import Aside from '../Aside';
import Header from '../Header';
import { useSelector } from 'react-redux';

import './style.scss';

const LayoutBoard = ({ children, className }) => {
  const {
    visibleModal,
    isVisibleModalDeleteDocs,
    isVisibleNotifications,
    isVisibleBlurSheduleCall,
    isVisibleActiveTechnical,
    isVisibleActiveSteps,
  } = useSelector((state) => state.modal);

  return (
    <div
      className={`app-dashboard ${className}`}
      style={{
        filter:
          visibleModal ||
          isVisibleNotifications ||
          isVisibleModalDeleteDocs ||
          isVisibleBlurSheduleCall ||
          isVisibleActiveTechnical ||
          isVisibleActiveSteps
            ? 'blur(3px)'
            : 'blur(0px)',
      }}>
      <Aside />
      <Header />
      <Layout.Content className="main-content">
        <div className="dashboard-wrapper">{children}</div>
      </Layout.Content>
    </div>
  );
};

export default LayoutBoard;
