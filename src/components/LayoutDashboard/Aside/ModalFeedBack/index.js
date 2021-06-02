import React, { useState, useCallback } from 'react';
import './style.scss';
import { Form, Radio, Button, Modal, Input } from 'antd';
import { CloseIconModal } from '../../../icons/index';
import { useDispatch } from 'react-redux';
import { Skeleton } from 'antd';

const { TextArea } = Input;

const ModalFeedBack = ({ visibleModal, handleCancel, currentCompany, checkForAvatar }) => {
  const [askSelection, setAskSelection] = useState(null);
  const dispatch = useDispatch();
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };
  const onFinish = (values) => {
    //console.log('Received values of form: ', values);
  };

  return (
    <Modal
      visible={visibleModal}
      onCancel={() => {
        dispatch(handleCancel());
      }}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      width={900}
      closeIcon={<CloseIconModal />}>
      <Form
        {...formItemLayout}
        name="askForm"
        onFinish={onFinish}
        // form={askFrom}
      >
        <div className="wrapper-info">
          <div className="info-img-text-info">
            {!currentCompany ? (
              <Skeleton.Avatar avatar active paragraph={false} avatarShape="circle" size="large" />
            ) : (
              <img src={checkForAvatar()} alt="Photo Avatar" />
            )}

            <b className="feedBack__text">
              Please take some time to give us feedback on the first R&D Tax Relief platform
            </b>
          </div>
          <Form.Item
            name="text"
            rules={[
              {
                required: true,
                message: 'Please input your message.',
              },
              {
                min: 5,
                message: 'Message should be at least 5 characters.',
              },
            ]}>
            <TextArea rows={9} style={{ width: '85%', margin: '0 auto' }} />
          </Form.Item>
        </div>
        <div className="wrapper-btn-modal">
          <Button
            type="button"
            onClick={() => {
              dispatch(handleCancel());
            }}>
            Back
          </Button>
          <Button type="primary" htmlType="submit">
            Ask
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalFeedBack;
