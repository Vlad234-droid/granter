import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Button } from 'antd';
import ModalAsk from './ModalAsk/index';
import { useLocation } from 'react-router-dom';
import headerLogo from '../../../assets/img/header-logo.svg';
import { Skeleton } from 'antd';
import { bindActionCreators } from 'redux';

import { IconPhone, IconMail } from '../../icons';
import { showModalAction, closeModalAction } from '../../../core/actions/modal';
import actions from '../../../core/actions';
import './style.scss';

const { SubMenu, Item } = Menu;

const Aside = () => {
  let location = useLocation();
  const dispatch = useDispatch();
  const { visibleModal } = useSelector((state) => state.modal);
  const { currentCompany } = useSelector((state) => state.user);
  const [currentMenu, setCurrentMenu] = useState([]);
  const { showSubMenu, closeSubMenu } = bindActionCreators(actions, dispatch);
  const { isVisibleSubMenu } = useSelector((state) => state.modal);
  const [addSubClass, setAddSubClass] = useState(false);

  console.log('isVisibleSubMenu', addSubClass);

  useEffect(() => {
    switch (true) {
      case location.pathname.includes('active-claims'):
        setCurrentMenu(() => ['active']);
        break;
      case location.pathname.includes('future-claims'):
        setCurrentMenu(() => ['future']);
        break;
      case location.pathname.includes('profile'):
        setCurrentMenu(() => ['profile']);
        break;
      case location.pathname.includes('clients'):
        setCurrentMenu(() => ['clients']);
        break;
      case location.pathname.includes('introduction'):
        setCurrentMenu('library-introduction');
        setAddSubClass(() => true);
        break;
      case location.pathname.includes('financial'):
        setCurrentMenu('library-financial');
        setAddSubClass(() => true);
        break;
      case location.pathname.includes('technical'):
        setCurrentMenu('library-technical');
        setAddSubClass(() => true);
        break;
      case location.pathname.includes('submission'):
        setCurrentMenu('library-submission');
        setAddSubClass(() => true);
        break;

      default:
        setCurrentMenu(() => []);
        setAddSubClass(() => false);
        break;
    }
    return () => setCurrentMenu(() => []);
  }, [location.pathname]);

  const checkForAvatar = useCallback(() => {
    if (currentCompany) return currentCompany.manager?.avatar;
  }, [currentCompany]);

  const testFn = (e) => {
    //setCurrentMenu(() => [e.key]);
  };

  const onOpenChange = useCallback(
    (key) => {
      if (!isVisibleSubMenu.length) {
        showSubMenu(key);
      } else {
        closeSubMenu();
      }
    },
    [isVisibleSubMenu],
  );

  return (
    <aside className="nav-left">
      <div className="nav__logo">
        <Link to="/active-claims/">
          <img src={headerLogo} alt="logo" />
          <span>Granter</span>
        </Link>
      </div>
      <div className="nav__scroll">
        <Menu
          multiple={true}
          mode="inline"
          selectedKeys={currentMenu}
          onOpenChange={onOpenChange}
          openKeys={isVisibleSubMenu}>
          <Item key="active">
            <Link to="/active-claims/">Active Claims</Link>
          </Item>
          <Item key="future">
            <Link to="/future-claims/">Future Claims</Link>
          </Item>
          <Item key="completed">
            <Link to="/">Completed Claims</Link>
          </Item>
          <Item key="profile" className="profile">
            <Link to="/profile/">Profile</Link>
          </Item>
          <SubMenu key="library" title="Documents Library" className={addSubClass ? 'active_subMenu' : ''}>
            <Item key="library-introduction">
              <Link to="/documents/introduction">Introduction</Link>
            </Item>
            <Item key="library-financial">
              <Link to="/documents/financial">Financial</Link>
            </Item>
            <Item key="library-technical">
              <Link to="documents/technical">Technical</Link>
            </Item>
            <Item key="library-submission">
              <Link to="documents/submission">Submission</Link>
            </Item>
          </SubMenu>
        </Menu>
        <div className="nav__help">
          <div className="nav__help_title">Need Help?</div>
          {!currentCompany ? (
            <Skeleton active paragraph={{ rows: 1 }} />
          ) : (
            <>
              <a
                href={`tel:${
                  currentCompany &&
                  currentCompany.manager &&
                  currentCompany.manager?.phone &&
                  `${currentCompany.manager.phone}`
                }`}>
                <IconPhone />
                <span>
                  {currentCompany &&
                    currentCompany.manager &&
                    currentCompany.manager?.phone &&
                    `${currentCompany.manager.phone}`}
                </span>
              </a>
              <a
                href={`mailto:${
                  currentCompany &&
                  currentCompany.manager &&
                  currentCompany.manager?.email &&
                  `${currentCompany.manager.email}`
                }`}>
                <IconMail />
                <span>
                  {currentCompany &&
                    currentCompany.manager &&
                    currentCompany.manager?.email &&
                    `${currentCompany.manager.email}`}
                </span>
              </a>
            </>
          )}
        </div>
        <div className="nav__ask">
          <div className="nav__ask_manager">
            {!currentCompany ? (
              <Skeleton.Avatar avatar active paragraph={false} avatarShape="circle" size="large" />
            ) : (
              <>
                <img src={checkForAvatar()} alt="photo" />
                <div>
                  <b>
                    {currentCompany &&
                      currentCompany.manager &&
                      currentCompany.manager?.name &&
                      `${currentCompany.manager.name}`}
                  </b>
                  <span>Your manager</span>
                </div>
              </>
            )}
          </div>
          <Button
            type="primary"
            onClick={() => {
              dispatch(showModalAction());
            }}>
            Ask a Question
          </Button>
          <ModalAsk visibleModal={visibleModal} handleCancel={closeModalAction} />
        </div>
      </div>
    </aside>
  );
};

export default Aside;
