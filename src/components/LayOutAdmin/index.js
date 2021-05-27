import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderSearchAdmin from '../headerSearchAdmin';
import AdminHeaderNotifications from '../AdminHeaderNotifications';
import { Button } from 'antd';
import './style.scss';
import { useLocation } from 'react-router-dom';
import { Layout } from 'antd';

const LayOutAdmin = ({ children }) => {
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    setActiveLink(() => pathname.split('/')[2]);

    return () => setActiveLink(() => '');
  }, [pathname]);
  console.log(activeLink);

  const config = [
    {
      to: '/admin/clients',
      text: 'Clients',
      routeLi: 'clients',
    },
    {
      to: '/admin/calls',
      text: 'Calls',
      routeLi: 'calls',
    },
    {
      to: '/admin/settings',
      text: 'Settings',
      routeLi: 'settings',
    },
  ];

  return (
    <>
      <div className="admin_header">
        <div className="wrapper_links_S">
          <ul>
            {config.map((item) => (
              <li key={item.text} className={activeLink === item.routeLi ? 'activeLink' : ''}>
                <Link to={item.to}>{item.text}</Link>
              </li> // here problem
            ))}
          </ul>
          <div className="search">
            <HeaderSearchAdmin />
          </div>
        </div>

        <div className="wrapper_btn_Noti">
          <div className="btn">
            <Button type="button" htmlType="submit">
              Add Client
            </Button>
          </div>
          <div className="noti">
            <AdminHeaderNotifications />
          </div>
        </div>
      </div>
      <Layout.Content className="wrapper_content">
        <div className="admin_dashboard_wrapper">{children}</div>
      </Layout.Content>
    </>
  );
};
export default LayOutAdmin;
