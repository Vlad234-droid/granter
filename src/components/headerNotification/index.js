import React, { useEffect, useState } from 'react';
import { Badge, Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getNotificationsForUser } from '../../core/services/getNotificationsForUser';
import { IconNotifications } from '../icons';
import './style.scss';
import { showModalNotifications, closeModalNotifications } from '../../core/actions/modal';
import { CloseIconModal } from '../icons/index';
import { IconCompany } from '../icons';

const HeaderNotification = () => {
  const company = useSelector((state) => state.user.currentCompany);
  const { isVisibleNotifications } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [notiData, setNotiData] = useState([]);
  const [count, setCount] = useState('');
  console.log('notiData', notiData);

  useEffect(() => {
    if (company) {
      const { id } = company;
      getNotificationsForUser(dispatch, id).then((data) => {
        setNotiData(() => data);
      });
      // if(!notiData.length) {
      //
      // } else{
      //
      // }
    }
    return () => {
      setNotiData(() => []);
    };
  }, [company]);

  const showDrawer = () => {
    if (!notiData.length) {
      dispatch(closeModalNotifications());
    } else {
      dispatch(showModalNotifications());
    }
  };

  const onClose = () => {
    dispatch(closeModalNotifications());
  };

  const getTitle = () => {
    return (
      <>
        {company && (
          <>
            <div className="header__company_icon blue">
              <IconCompany />
            </div>
            <div className="header__company_name">{company.name}</div>
          </>
        )}
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

  const getCurrentNoti = () => {
    if (!notiData.length) return;
    const filterNotiData = notiData.filter((item) => item.type === 1);
    return filterNotiData.length;
  };

  return (
    <div className="header__notification">
      <button onClick={showDrawer}>
        <Badge count={getCurrentNoti()}>
          <IconNotifications empty={notiData.length} />
        </Badge>
      </button>
      <Drawer
        title={getTitle()}
        className="header__notification_drawer"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={isVisibleNotifications}
        width={508}
        closeIcon={<CloseIconModal />}
        closable={true}>
        <ul className="list_of_notif">
          {notiData !== null ? (
            notiData.map((item) => (
              <li className="wrapper_li" key={item.id}>
                <div className="time_container">
                  <time className="created_at">{convertDate(item.created_at)}</time>
                  <time className="created_at">{convertTime(item.created_at)}</time>
                </div>
                <div className="details_container">
                  <div className="item_li">{item.text}</div>
                  <Link to={`/document/${item.claim_id}/${item.document_id}/`} className="check_doc">
                    Check document
                  </Link>
                </div>
              </li>
            ))
          ) : (
            <div>The lkist is Empty</div>
          )}
        </ul>
      </Drawer>
    </div>
  );
};

export default HeaderNotification;
