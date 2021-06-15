import React, { useState, useRef } from 'react';
import './style.scss';
import { Button, Modal } from 'antd';
import { CloseIconModal } from '../../../../components/icons/index';
import { useDispatch } from 'react-redux';
import { SheduleDone } from '../../../../components/icons/index';

const CommonModalShadule = ({ children, isVisibleModalSheduleCall, setIsVisibleModalSheduleCall }) => {
  const [askSelection, setAskSelection] = useState(null);
  const dispatch = useDispatch();
  const [test, setTest] = useState(true);
  const onChange = (time, timeString) => {
    //console.log(time, timeString);
  };

  const refCopy = useRef();

  const handleCopy = (ref) => {
    ref.current.select();
    ref.current.focus();
    document.execCommand('copy');
    setTest((prev) => !prev);
  };

  return (
    <Modal
      visible={isVisibleModalSheduleCall}
      onCancel={() => {
        setIsVisibleModalSheduleCall((prev) => !prev);
      }}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      width={750}
      closeIcon={<CloseIconModal />}
      wrapClassName="shedule_modal">
      <div>
        <h2>Schedule a Call</h2>
        <div>{children}</div>
        <div className="block_copy_info">
          <h3>We are going to redirect you to hubspot to schedule the call.</h3>
          <h3>Please, copy this code and go there to schedule this call. </h3>
          <div className="done_info">
            {!test && (
              <div className="done">
                <SheduleDone />
              </div>
            )}
            <h3>
              <input ref={refCopy} value="valueTest" type="text" className="copy_input" readOnly />
              <span onClick={() => handleCopy(refCopy)}>Click here</span> to copy the link
            </h3>
          </div>
        </div>
        <div className="sheduleModal__block_btn">
          <Button
            type="button"
            onClick={() => {
              setIsVisibleModalSheduleCall((prev) => !prev);
            }}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" disabled={test}>
            Schedule a call
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CommonModalShadule;
