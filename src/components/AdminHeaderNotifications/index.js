import React, { useEffect, useState } from 'react';
import { Badge, Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getNotificationsForUser } from '../../core/services/getNotificationsForUser';
import { IconNotificationsLength, IconNotificationsEmpty } from '../icons';
import './style.scss';
import { showModalNotifications, closeModalNotifications } from '../../core/actions/modal';
import { CloseIconModal } from '../icons/index';
import { IconCompany } from '../icons';
import { Tooltip } from 'antd';
import { readNoti } from '../../core/services/readNotiServices';
import { getNotificationsForAdmin, readAdminNoti } from '../../core/adminServices/notificationsServices';
import { bindActionCreators } from 'redux';
import actions from '../../core/actions';

const HeaderNotification = () => {
  const company = useSelector((state) => state.user.currentCompany);
  const [modalNoti, setModalNoti] = useState(false);
  const dispatch = useDispatch();
  const [notiData, setNotiData] = useState([]);
  const [count, setCount] = useState('');

  const { setIsBlur } = bindActionCreators(actions, dispatch);

  useEffect(() => {
    let cleanupFunction = false;
    getNotificationsForAdmin().then((data) => {
      if (!cleanupFunction) setNotiData(() => data);
    });

    return () => {
      setNotiData(() => []);
      cleanupFunction = true;
    };
  }, [company]);

  useEffect(() => {
    let cleanupFunction = false;
    if (notiData === undefined) {
      return;
    } else if (notiData.length) {
      if (!cleanupFunction) setCount(() => notiData.filter((item) => item.status === 2).length);
    }
    return () => {
      cleanupFunction = true;
      setCount(() => '');
    };
  }, [notiData, dispatch]);

  const showDrawer = () => {
    readAdminNoti().then((data) => {
      if (data.success) {
        getNotificationsForAdmin().then((data) => {
          setNotiData(() => data);
        });
      }
    });

    if (!notiData.length) {
      setModalNoti(() => false);
      setIsBlur(false);
    } else {
      setModalNoti(() => true);
      setIsBlur(true);
    }
  };

  const onClose = () => {
    setModalNoti(() => false);
    setIsBlur(false);
  };

  const getTitle = () => {
    return <div className="header__company_name">Admin Notifications</div>;
  };
  const convertDate = (date) => {
    function convertDate(inputFormat) {
      function pad(s) {
        return s < 10 ? '0' + s : s;
      }
      var d = new Date(inputFormat);
      return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
    }
    return convertDate(date);
  };

  const convertTime = (date) => {
    function convertDate(inputFormat) {
      function pad(s) {
        return s < 10 ? '0' + s : s;
      }
      var d = new Date(inputFormat);
      return [pad(d.getHours()), pad(d.getMinutes())].join(':');
    }
    return convertDate(date);
  };

  return (
    <div className="admin_header__notification">
      <button onClick={showDrawer}>
        {notiData === undefined ? (
          ''
        ) : (
          <>
            {notiData.length ? (
              <Badge count={count}>
                <IconNotificationsLength />
              </Badge>
            ) : (
              <Tooltip placement="left" title="You don’t have any notifications yet">
                <span>
                  <IconNotificationsEmpty />
                </span>
              </Tooltip>
            )}
          </>
        )}
      </button>
      <Drawer
        title={getTitle()}
        className="header__notification_drawer"
        placement="right"
        onClose={onClose}
        visible={modalNoti}
        width={508}
        closeIcon={
          <div className="custom_close_admin">
            <CloseIconModal />
          </div>
        }
        closable={true}>
        <ul className="list_of_notif">
          {notiData === undefined ? (
            ''
          ) : (
            <>
              {notiData !== null ? (
                notiData.map((item) => (
                  <li className="wrapper_li" key={item.id}>
                    <div className="time_container">
                      <time className="created_at">{convertDate(item.created_at)}</time>
                      <time className="created_at">{convertTime(item.created_at)}</time>
                    </div>
                    <div className="details_container">
                      <div className="item_li">{item.title}</div>
                      {item.document_id === null &&
                      item.project_id === null &&
                      item.company_id === null &&
                      item.claim_id === null ? (
                        ''
                      ) : (
                        <Link
                          to={
                            item.document_id === null
                              ? `/admin/project/${item.claim_id}/${item.project_id}/`
                              : `/admin/document/${item.claim_id}/${item.document_id}/`
                          }
                          className="check_doc"
                          onClick={() => {
                            setModalNoti(() => false);
                            setIsBlur(false);
                          }}>
                          Check document
                        </Link>
                      )}
                    </div>
                  </li>
                ))
              ) : (
                <div>The list is Empty</div>
              )}
            </>
          )}
        </ul>
      </Drawer>
    </div>
  );
};

export default HeaderNotification;
