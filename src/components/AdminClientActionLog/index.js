import React, { useEffect, useState, useCallback } from 'react';
import { Badge, Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { IconNotificationsLength, IconNotificationsEmpty } from '../icons';

import actions from '../../core/actions/';
import { CloseIconModal } from '../icons/index';
import { IconCompany } from '../icons';
import { Tooltip } from 'antd';
import { readNoti } from '../../core/services/readNotiServices';

import './style.scss';

const AdminClientActionLog = ({ visible, list, name, onClose }) => {
  const company = useSelector((state) => state.user.currentCompany);
  const dispatch = useDispatch();
  const { setIsBlur } = bindActionCreators(actions, dispatch);

  useEffect(() => {
    setIsBlur(visible);
  }, [visible]);

  // const showDrawer = () => {
  //   if (!!count) {
  //     readNoti(company.id).then((data) => {
  //       if (data.success) {
  //         getNotificationsForUser(dispatch, company.id).then((data) => {
  //           setNotiData(() => data);
  //         });
  //       }
  //     });
  //   }

  //   if (!notiData.length) {
  //     dispatch(closeModalNotifications());
  //   } else {
  //     dispatch(showModalNotifications());
  //   }
  // };

  // const onClose = () => {
  //   dispatch(closeModalNotifications());
  // };

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

  //const checkForLinkTo = useCallback(
  //  (item) => {
  //    if (item.project_id === null) {
  //      setIsBlur(false);
  //      return `/admin/document/${item.claim_id}/${item.document_id}/`;
  //    }
  //    if (item.document_id === null) {
  //      setIsBlur(false);
  //      return `/admin/project/${item.claim_id}/${item.project_id}`;
  //    }
  //  },
  //  [list],
  //);

  return (
    <div className="header__notification">
      <Drawer
        title={`${name ? name + ' Actions Log' : 'Actions Log'}`}
        className="header__notification_drawer"
        placement="right"
        closable={false}
        onClose={() => {
          setIsBlur(false);
          onClose();
        }}
        visible={visible}
        width={508}
        closeIcon={<CloseIconModal />}
        closable={true}>
        <ul className="list_of_notif">
          {list === undefined ? (
            ''
          ) : (
            <>
              {list ? (
                list.map((item) => (
                  <li className="wrapper_li" key={item.id}>
                    <div className="time_container">
                      <time className="created_at">{convertDate(item.created_at)}</time>
                      <time className="created_at">{convertTime(item.created_at)}</time>
                    </div>
                    <div className="details_container">
                      <div className="item_li">{item.title}</div>
                      {item.claim_id !== null ? (
                        <Link
                          to={`${
                            item.project_id === null
                              ? `/admin/document/${item.claim_id}/${item.document_id}/`
                              : `${item.document_id === null && `/admin/project/${item.claim_id}/${item.project_id}`}`
                          }`}
                          className="check_doc"
                          onClick={() => setIsBlur(false)}>
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

export default AdminClientActionLog;
