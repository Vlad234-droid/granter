import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HeaderSearchAdmin from '../headerSearchAdmin';
import AdminHeaderNotifications from '../AdminHeaderNotifications';
import { Layout, Button } from 'antd';
import { useSelector } from 'react-redux';
import actions from '../../core/actions';
import './style.scss';
import { useDispatch } from 'react-redux';
import { config } from './config';
import { bindActionCreators } from 'redux';

const LayOutAdmin = ({ children, className }) => {
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();
  const { pathname } = location;
  const isBlur = useSelector((state) => state.modal.isBlur);
  const dispatch = useDispatch();
  const { registrationChangeEstimate } = bindActionCreators(actions, dispatch);

  useEffect(() => {
    setActiveLink(() => pathname.split('/')[2]);

    return () => setActiveLink(() => '');
  }, [pathname]);

  return (
    <>
      <div
        className={`admin_wrapper ${className}`}
        style={{
          filter: isBlur ? 'blur(3px)' : 'blur(0px)',
        }}>
        <div className="admin_header">
          <div className="wrapper_links_S">
            <ul>
              {config.map((item) => (
                <li key={item.text} className={activeLink === item.routeLi ? 'activeLink' : ''}>
                  <Link to={item.to}>{item.text}</Link>
                </li>
              ))}
            </ul>
            {/* <div className="search">
              <HeaderSearchAdmin />
            </div> */}
          </div>

          <div className="wrapper_btn_Noti">
            <div className="btn">
              <Link
                to="/admin/add-client"
                className="ant-btn ant-btn-button"
                onClick={() => {
                  registrationChangeEstimate(null);
                }}>
                Add Client
              </Link>
            </div>
            <div className="noti">
              <AdminHeaderNotifications />
            </div>
          </div>
        </div>
        <Layout.Content className="wrapper_content">
          <div className="admin_dashboard_wrapper">{children}</div>
        </Layout.Content>
      </div>
    </>
  );
};
export default LayOutAdmin;
