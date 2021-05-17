import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Menu, Button } from "antd";
import ModalAsk from "./ModalAsk/index";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import headerLogo from "../../../assets/img/header-logo.svg";
import AskPhoto from "../../../assets/img/ask-photo.png";
import { Skeleton } from "antd";

import { IconPhone, IconMail } from "../../icons";
import { showModalAction, closeModalAction } from "../../../core/actions/modal";

import "./style.scss";

const { SubMenu, Item } = Menu;

const Aside = () => {
  let location = useLocation();
  const dispatch = useDispatch();
  const { currentCompany } = useSelector((state) => state.user);
  const [currentMenu, setCurrentMenu] = useState("");
  const { visibleModal } = useSelector((state) => state.modal);

  useEffect(() => {
    switch (true) {
      case location.pathname.includes("active-claims"):
        setCurrentMenu("active");
        break;
      case location.pathname.includes("future-claims"):
        setCurrentMenu("future");
        break;
      case location.pathname.includes("profile"):
        setCurrentMenu("profile");
        break;
      case location.pathname.includes("clients"):
        setCurrentMenu("clients");
        break;
      // case location.pathname.includes("questions"):
      //   setCurrentMenu("library-questions");
      //   setCurrentOpentMenu("library");
      //   break;

      default:
        setCurrentMenu("");
        break;
    }
  }, []);

  const checkForAvatar = useCallback(() => {
    if (currentCompany) return currentCompany.manager?.avatar;
  }, [currentCompany]);

  return (
    <aside className='nav-left'>
      <div className='nav__logo'>
        <Link to='/active-claims/'>
          <img src={headerLogo} alt='logo' />
          <span>Granter</span>
        </Link>
      </div>
      <div className='nav__scroll'>
        <Menu
          mode='inline'
          selectedKeys={[currentMenu]}
          //openKeys={[state.navigationLibraryIsOpen]}
          // onOpenChange={(item, key, keyPath, domEvent) => {
          //     const setNavigationLibrary = bindActionCreators(
          //         setNavigationLibraryIsOpen,
          //         dispatch
          //     );
          //     setNavigationLibrary(
          //         state.navigationLibraryIsOpen
          //             ? null
          //             : "library"
          //     );
          // }}
        >
          <Item key='active'>
            <Link to='/active-claims/'>Active Claims</Link>
          </Item>
          <Item key='future'>
            <Link to='/future-claims/'>Future Claims</Link>
          </Item>
          <Item key='completed'>
            <Link to='/'>Completed Claims</Link>
          </Item>
          <Item key='profile' className='profile'>
            <Link to='/profile/'>Profile</Link>
          </Item>

          <SubMenu key='library' title='Documents Library'>
            <Item key='library-introduction'>
              <Link to='/documents/introduction'>Introduction</Link>
            </Item>
            <Item key='library-financial'>
              <Link to='/'>Financial</Link>
            </Item>
            <Item key='library-technical'>
              <Link to='/'>Technical</Link>
            </Item>
            <Item key='library-submission'>
              <Link to='/'>Submission</Link>
            </Item>
          </SubMenu>
        </Menu>
        <div className='nav__help'>
          <div className='nav__help_title'>Need Help?</div>
          {!currentCompany ? (
            <Skeleton active paragraph={{ rows: 1 }} />
          ) : (
            <>
              <a
                href={`tel:${
                  currentCompany &&
                  currentCompany.manager &&
                  currentCompany.manager.phone &&
                  `${currentCompany.manager.phone}`
                }`}
              >
                <IconPhone />
                <span>
                  {currentCompany &&
                    currentCompany.manager &&
                    currentCompany.manager.phone &&
                    `${currentCompany.manager.phone}`}
                </span>
              </a>
              <a
                href={`mailto:${
                  currentCompany &&
                  currentCompany.manager &&
                  currentCompany.manager.phone &&
                  `${currentCompany.manager.email}`
                }`}
              >
                <IconMail />
                <span>
                  {currentCompany &&
                    currentCompany.manager &&
                    currentCompany.manager.phone &&
                    `${currentCompany.manager.email}`}
                </span>
              </a>
            </>
          )}
        </div>
        <div className='nav__ask'>
          <div className='nav__ask_manager'>
            {!currentCompany ? (
              <Skeleton.Avatar
                avatar
                active
                paragraph={false}
                avatarShape='circle'
                size='large'
              />
            ) : (
              <>
                <img src={checkForAvatar()} alt='photo' />
                <div>
                  <b>Michael</b>
                  <span>Your manager</span>
                </div>
              </>
            )}
          </div>
          <Button
            type='primary'
            onClick={() => {
              dispatch(showModalAction());
            }}
          >
            Ask a Question
          </Button>
          <ModalAsk
            visibleModal={visibleModal}
            handleCancel={closeModalAction}
          />
        </div>
      </div>
    </aside>
  );
};

export default Aside;
