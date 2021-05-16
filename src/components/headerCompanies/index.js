import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserCompanies } from "../../core/services";
import lockr from "lockr";

import { Dropdown, Menu } from "antd";
import { IconCompany } from "../icons";

import actions from "../../core/actions";

import "./style.scss";

const HeaderCompanies = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { setUserCurrentCompany } = bindActionCreators(actions, dispatch);

  useEffect(() => {
    if (!user.companies) {
      fetchUserCompanies(dispatch).then((data) => {
        const currentId = lockr.get("current-company-id");
        if (currentId) {
          if (data.filter((item) => item.id === currentId).length) {
            setUserCurrentCompany(
              data.filter((item) => item.id === currentId)[0]
            );
          } else {
            setUserCurrentCompany(data[0]);
          }
        } else {
          setUserCurrentCompany(data[0]);
          lockr.set("current-company-id", data[0].id);
        }
      });
    }
  }, []);

  const companyChange = (id) => {
    setUserCurrentCompany(user.companies.filter((item) => item.id === id)[0]);
    lockr.set("current-company-id", id);
  };

  const menu = (
    <Menu>
      {user.companies &&
        user.currentCompany &&
        user.companies.map((item, index) => {
          if (item.id !== user.currentCompany.id) {
            return (
              <Menu.Item
                key={`company-${index}`}
                onClick={() => {
                  companyChange(item.id);
                }}
              >
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
          placement='bottomLeft'
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
