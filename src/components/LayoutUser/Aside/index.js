import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Menu, Modal, Button } from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";

import headerLogo from "../../../assets/img/header-logo.svg";
import AskPhoto from "../../../assets/img/ask-photo.png";

import { IconPhone, IconMail } from "../../icons";

import "./style.scss";

const { SubMenu, Item } = Menu;

export default function Aside() {
  let location = useLocation();

  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);
  const history = useHistory();

  return (
    <aside className='nav-left'>
      <div className='nav__logo'>
        <Link to='/'>
          <img src={headerLogo} alt='logo' />
          <span>Granter</span>
        </Link>
      </div>
      <div className='nav__scroll'>
        <Menu
          mode='inline'
          selectedKeys={["active"]}
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
            <Link to='/'>Active Claims</Link>
          </Item>
          <Item key='future'>
            <Link to='/'>Future Claims</Link>
          </Item>
          <Item key='completed'>
            <Link to='/'>Completed Claims</Link>
          </Item>
          <Item key='profile' className='profile'>
            <Link to='/'>Profile</Link>
          </Item>

          <SubMenu key='library' title='Documents Library'>
            <Item key='library-introduction'>
              <Link to='/'>Introduction</Link>
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
          <a href='tel:+44(0)2078878888'>
            <IconPhone />
            <span>+44 (0)20 7887 8888</span>
          </a>
          <a href='mailto:michael@granter.com'>
            <IconMail />
            <span>michael@granter.com</span>
          </a>
        </div>
        <div className='nav__ask'>
          <div className='nav__ask_manager'>
            <img src={AskPhoto} alt='' />
            <div>
              <b>Michael</b>
              <span>Your manager</span>
            </div>
          </div>
          <Button type='primary'>Ask a Question</Button>
        </div>
      </div>
    </aside>
  );
}
