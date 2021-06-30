import React, { useState, useCallback } from 'react';
import './style.scss';
import AskPhoto from '../../../../assets/img/ask-photo.png';
import { Form, Radio, Button, Modal, Input } from 'antd';
import { CloseIconModal } from '../../../icons/index';
import { useDispatch } from 'react-redux';
import { askAQuestion } from '../../../../core/services/askAQuestion';

const { TextArea } = Input;

const ModalAsk = ({ claim_id, manager_id, visibleModal, handleCancel }) => {
  const [askSelection, setAskSelection] = useState(null);
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };
  const onFinish = ({ text, phone }) => {
    askAQuestion(manager_id, claim_id, text, phone === undefined ? 0 : phone).then((data) => {
      if (data.ok) {
        form.setFieldsValue({
          phone: '',
          text: '',
          options: 'email',
        });
        setAskSelection(() => null);
        dispatch(handleCancel());
      }
    });
  };
  const onAskSelectionChange = useCallback(
    (e) => {
      setAskSelection(() => e.target.value);
    },
    [setAskSelection],
  );

  const checkForPhoneRender = () => {
    if (askSelection === 'phone') {
      return (
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              pattern: /^(\+)(\d+)$/,
              message: 'Phone number must start with +, allowed characters is 0-9',
            },
          ]}>
          <Input
            placeholder="Please, leave your phone number"
            style={{ width: '85%', margin: '20px auto 10px auto' }}
          />
        </Form.Item>
      );
    }
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
        form={form}
        onFinish={onFinish}
        initialValues={{
          options: 'email',
        }}>
        <div className="wrapper-info">
          <div className="info-img-text-info">
            <img src={AskPhoto} alt="Logo Photo" />
            <b>Have a Question? Our consultants are always on hand to help.</b>
            <p>Type your message and your consultant will respond to you on email.</p>
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
          <div className="checkBox">
            <h3>Receive answer by:</h3>
            <Form.Item name="options">
              <Radio.Group onChange={onAskSelectionChange}>
                <Radio value="email" name="email">
                  Email
                </Radio>
                <Radio value="phone" name="phone">
                  Phone
                </Radio>
              </Radio.Group>
            </Form.Item>
          </div>
          {checkForPhoneRender()}
        </div>
        <div className="wrapper-btn-modal">
          <Button
            style={{ width: '89px' }}
            type="button"
            onClick={() => {
              dispatch(handleCancel());
            }}>
            Back
          </Button>
          <Button style={{ width: '89px' }} type="primary" htmlType="submit">
            Ask
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalAsk;
