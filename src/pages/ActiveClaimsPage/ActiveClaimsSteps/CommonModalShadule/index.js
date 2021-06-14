import React from 'react';
import './style.scss';
import { Button, Modal } from 'antd';
import { CloseIconModal } from '../../../../components/icons/index';
import { TimePicker } from 'antd';
import { SuffixShedulleCallIcon } from '../../../../components/icons/index';

const CommonModalShadule = ({ children, isVisibleModalSheduleCall, setIsVisibleModalSheduleCall }) => {
  return (
    <Modal
      visible={isVisibleModalSheduleCall}
      onCancel={() => {
        setIsVisibleModalSheduleCall((prev) => !prev);
      }}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      width={700}
      closeIcon={<CloseIconModal />}
      wrapClassName="shedule_modal">
      <div>
        <h2>Schedule a Call</h2>
        <div>{children}</div>
        <div className="wrapper_text_timePicker">
          <b>Select the time slot which suits you</b>
          <TimePicker
            use12Hours
            format="HH:mm"
            // onChange={onChange}
            placeholder="Today,  8:00AM"
            style={{ width: '180px', height: '40px' }}
            className="shedule_time_picker"
            suffixIcon={<SuffixShedulleCallIcon />}

            //hideDisabledOptions={hideDisabledOptions}
          />
        </div>
        <div className="sheduleModal__block_btn">
          <Button
            type="button"
            onClick={() => {
              setIsVisibleModalSheduleCall((prev) => !prev);
            }}>
            Back
          </Button>
          <Button type="primary" htmlType="submit">
            Ask
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CommonModalShadule;
