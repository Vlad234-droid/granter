import React, { useState, useRef, useEffect } from 'react';
import './style.scss';
import { Button, Modal, Input } from 'antd';
import { CloseIconModal } from '../../../../components/icons/index';
import { useDispatch } from 'react-redux';
import { SheduleDone } from '../../../../components/icons/index';

const CommonModalShadule = ({ children, isVisibleModalSheduleCall, setIsVisibleModalSheduleCall, md }) => {
  const [askSelection, setAskSelection] = useState(null);
  const dispatch = useDispatch();
  const [test, setTest] = useState(false);

  const refCopy = useRef();

  const handleCopy = (ref) => {
    try {
      setTest(() => true);
      ref.current.select();
      ref.current.focus();
      document.execCommand('copy');
    } catch (err) {
      console.log(err);
    }
  };

  const handleFocus = (e) => {
    setTest(() => true);
    e.target.select();
    document.execCommand('copy');
  };

  return (
    <Modal
      visible={isVisibleModalSheduleCall}
      onCancel={() => {
        setIsVisibleModalSheduleCall((prev) => !prev);
        setTest(() => false);
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
          <h3>Please, copy this code and PASTE IT on the Hubspot (client hash field).</h3>
          <div className="done_info">
            {test && (
              <div className="done">
                <SheduleDone />
              </div>
            )}
            <h3>
              <input ref={refCopy} value={md} type="text" className="copy_input" readOnly />
              <span onClick={() => handleCopy(refCopy)}>Click here</span> to copy the link
            </h3>
          </div>

          <Input type="text" name="mdI" value={md} readOnly className="md_input" onFocus={handleFocus} />
        </div>
        <div className="sheduleModal__block_btn">
          <Button
            type="button"
            onClick={() => {
              setIsVisibleModalSheduleCall((prev) => !prev);
              setTest(() => false);
            }}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" disabled={!test} onClick={() => {}}>
            Schedule a call
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CommonModalShadule;
