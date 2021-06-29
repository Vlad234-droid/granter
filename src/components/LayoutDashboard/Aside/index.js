import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Button } from 'antd';
import ModalAsk from './ModalAsk/index';
//import ModalFeedBack from './ModalFeedBack/index';
import { useLocation } from 'react-router-dom';
import headerLogo from '../../../assets/img/header-logo.svg';
import { Skeleton } from 'antd';
import { bindActionCreators } from 'redux';
import { IconPhone, IconMail } from '../../icons';
import { showModalAction, closeModalAction } from '../../../core/actions/modal';
import actions from '../../../core/actions';
import { logOut } from '../../../core/services/logOut';
import { LogOutSVG } from '../../../components/icons';
import './style.scss';
import { activeItems, subMenuItems } from './config';

const { SubMenu, Item } = Menu;

const Aside = () => {
  let location = useLocation();
  const dispatch = useDispatch();
  const { visibleModal } = useSelector((state) => state.modal);
  const { currentCompany } = useSelector((state) => state.user);
  const { id } = useSelector((state) => state.user?.data?.manager);
  const { activeClaimId } = useSelector((state) => state.user);
  const [currentMenu, setCurrentMenu] = useState([]);
  const { showSubMenu, closeSubMenu } = bindActionCreators(actions, dispatch);
  const isVisibleSubMenu = useSelector((state) => state?.modal?.isVisibleSubMenu);
  const [addSubClass, setAddSubClass] = useState(false);

  useEffect(() => {
    if (isVisibleSubMenu === undefined) showSubMenu([]);

    switch (true) {
      case location.pathname.includes('active-claims'):
        setCurrentMenu(() => ['active']);
        break;
      case location.pathname.includes('future-claims'):
        setCurrentMenu(() => ['future']);
        break;
      case location.pathname.includes('completed-claims'):
        setCurrentMenu(() => ['completed']);
        break;
      case location.pathname.includes('profile'):
        setCurrentMenu(() => ['profile']);
        break;
      case location.pathname.includes('clients'):
        setCurrentMenu(() => ['clients']);
        break;
      case location.pathname.includes('introduction'):
        if (currentMenu[0] === 'library-introduction') return;
        setCurrentMenu(() => ['library-introduction']);
        setAddSubClass(() => true);
        showSubMenu(['library']);
        break;
      case location.pathname.includes('financial'):
        if (currentMenu[0] === 'library-financial') return;
        setCurrentMenu(() => ['library-financial']);
        setAddSubClass(() => true);
        showSubMenu(['library']);

        break;
      case location.pathname.includes('technical'):
        if (currentMenu[0] === 'library-technical') return;
        setCurrentMenu(() => ['library-technical']);
        setAddSubClass(() => true);
        showSubMenu(['library']);

        break;
      case location.pathname.includes('submission'):
        if (currentMenu[0] === 'library-submission') return;
        setCurrentMenu(() => ['library-submission']);
        setAddSubClass(() => true);
        showSubMenu(['library']);
        break;

      default:
        setCurrentMenu(() => []);
        setAddSubClass(() => false);
        break;
    }
    return () => {
      setCurrentMenu(() => []);
    };
  }, [location.pathname]);

  const checkForAvatar = useCallback(() => {
    if (currentCompany) return currentCompany.manager?.avatar;
  }, [currentCompany]);

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

  const exit = () => {
    logOut(dispatch);
  };
  return (
    <aside className="nav-left">
      <div className="nav__logo">
        <Link to="/active-claims/">
          <img src={headerLogo} alt="logo" />
          <span>
            Granter <span>Beta</span>
          </span>
        </Link>
      </div>
      <div className="nav__scroll">
        <Menu
          multiple={true}
          mode="inline"
          selectedKeys={currentMenu}
          onOpenChange={onOpenChange}
          openKeys={isVisibleSubMenu}>
          {activeItems.map(({ key, to, text, className }) => (
            <Item key={key} className={className}>
              <Link to={to}>{text}</Link>
            </Item>
          ))}
          <SubMenu
            key="library"
            title="Library"
            className={addSubClass ? 'active_subMenu' : ''}
            onTitleClick={(key) => onOpenChange(key)}>
            {subMenuItems.map(({ key, to, text }) => (
              <Item key={key} style={{ height: '36px' }}>
                <Link to={to}>{text}</Link>
              </Item>
            ))}
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
          <ModalAsk
            activeClaimId={activeClaimId}
            manager_id={id}
            visibleModal={visibleModal}
            handleCancel={closeModalAction}
          />
          {/* <ModalFeedBack
            visibleModal={visibleModal}
            handleCancel={closeModalAction}
            currentCompany={currentCompany}
            checkForAvatar={checkForAvatar}
          /> */}
        </div>
        <div className="wrapper_container">
          <Button type="button" onClick={exit}>
            <div className="details__btn">
              <LogOutSVG />
              <span>Log out</span>
            </div>
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
