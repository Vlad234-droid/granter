import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import services from "../../core/services";

import { Dropdown, Menu } from "antd";
import { IconCompany } from "../icons";

import "./style.scss";

const { fetchUserCompanies } = services;

const HeaderCompanies = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUserCompanies(dispatch);
  }, []);

  const menu = (
    <Menu>
      {user.companies &&
        user.companies.map((item, index) => {
          if (index > 0) {
            return (
              <Menu.Item key={`company-${index}`}>
                <div className='header__company_icon yellow'>
                  <IconCompany />
                </div>
                <div className='header__company_name'>{item.name}</div>
              </Menu.Item>
            );
          }
        })}
    </Menu>
  );
  return (
    <div className='header__company'>
      {user.companies && user.companies.length > 1 && (
        <Dropdown
          overlay={menu}
          trigger={["click"]}
          overlayClassName='header__company_select-dropdown'
          getPopupContainer={() =>
            document.querySelector("header .header__company")
          }
        >
          <div className='header__company_selected'>
            <div className='header__company_icon blue'>
              <IconCompany />
            </div>
            <div className='header__company_name'>
              {user.currentCompany?.name}
            </div>
            <div className='header__company_dropdown-arrow'></div>
          </div>
        </Dropdown>
      )}

      {user.companies && user.companies.length === 1 && (
        <div className='header__company_selected'>
          <div className='header__company_icon blue'>
            <IconCompany />
          </div>
          <div className='header__company_name'>
            {user.currentCompany?.name}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderCompanies;
