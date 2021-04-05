import React from "react";

import { Dropdown, Menu } from "antd";
import { IconCompany } from "../icons";

import "./style.scss";

const HeaderCompanies = () => {
  const menu = (
    <Menu>
      <Menu.Item key='0'>
        <div className='header__company_icon yellow'>
          <IconCompany />
        </div>
        <div className='header__company_name'>World Agr Company</div>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className='header__company'>
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
          <div className='header__company_name'>World Agr Company</div>
          <div className='header__company_dropdown-arrow'></div>
        </div>
      </Dropdown>
    </div>
  );
};

export default HeaderCompanies;
