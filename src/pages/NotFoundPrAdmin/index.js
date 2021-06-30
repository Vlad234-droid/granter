import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import './style.scss';
import { NoFoundDocSVG } from '../../components/icons/index';
import { CloseIconModal } from '../../components/icons/index';

import { useHistory } from 'react-router-dom';

const NoFoundDoc = () => {
  const [notFound, setNotFound] = useState(true);
  const history = useHistory();

  return (
    <div id="full_back_admin">
      <Modal
        visible={notFound}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        width={552}
        className="modal_benefit"
        getContainer={() => document.getElementById('full_back_admin')}
        closeIcon={<CloseIconModal />}
        onCancel={() => {
          setNotFound();
          history.push('/admin/clients');
        }}>
        <div className="wrapper_info">
          <div className="item">
            <NoFoundDocSVG />
          </div>
          <b className="item">The file you selected is deleted. Try another one</b>
          <Button
            type="primary"
            htmlType="submit"
            className="item"
            onClick={() => {
              setNotFound();
              history.push('/admin/clients');
            }}>
            Okay
          </Button>
        </div>
      </Modal>
    </div>
  );
};
export default NoFoundDoc;
