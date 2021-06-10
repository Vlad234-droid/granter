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

const HeaderNotification = () => {
  const company = useSelector((state) => state.user.currentCompany);
  const { isVisibleNotifications } = useSelector((state) => state.modal);
  const [modalNoti, setModalNoti] = useState(false);
  const dispatch = useDispatch();
  const [notiData, setNotiData] = useState([]);
  const [count, setCount] = useState('');

  useEffect(() => {
    getNotificationsForAdmin().then((data) => {
      console.log(data);
      setNotiData(() => data);
    });

    return () => {
      setNotiData(() => []);
    };
  }, [company]);

  useEffect(() => {
    if (notiData === undefined) {
      return;
    } else if (notiData.length) {
      let count = notiData.filter((item) => item.status === 2).length;
      setCount(() => count);
    }
    return () => setCount(() => '');
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
    } else {
      setModalNoti(() => true);
    }
  };

  const onClose = () => {
    setModalNoti(() => false);
  };

  const getTitle = () => {
    return (
      <>
        {/* {company && (
          <>
            <div className="header__company_icon blue">
              <IconCompany />
            </div>
            <div className="header__company_name">{company.name}</div>
          </>
        )} */}
        <div>helo</div>
      </>
    );
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
        closeIcon={<CloseIconModal />}
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
                      {item.title !== 'Document was removed' ? (
                        <Link
                          to={`/document/${item.claim_id}/${item.document_id}/`}
                          className="check_doc"
                          onClick={() => dispatch(closeModalNotifications())}>
                          Check document
                        </Link>
                      ) : (
                        ''
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
