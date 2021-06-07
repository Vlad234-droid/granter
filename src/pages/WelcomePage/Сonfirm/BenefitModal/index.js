import React from 'react';
import { Modal, Form, Input, Button, Col } from 'antd';
import './style.scss';
import { setUserToUnregister } from '../../../../core/services/setUserToUnregister';

const BenefitModal = ({ state, isModalBenefit, setIsModalBenefit, goNextStep }) => {
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };
  const onFinish = (values) => {
    const { name, number, industry, materials_costs, staffing_costs, subcontracting_costs, software_costs } = state;
    const updatedList = {
      ...values,
      name,
      number,
      industry,
      materials_costs,
      staffing_costs,
      subcontracting_costs,
      software_costs,
    };
    setUserToUnregister(updatedList);
    setIsModalBenefit(() => false);
    goNextStep();
  };
  return (
    <Modal
      visible={isModalBenefit}
      closable={false}
      onCancel={() => {
        setIsModalBenefit(() => false);
      }}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      width={316}
      className="modal_benefit">
      <Form
        {...formItemLayout}
        name="askFormBenefit"
        onFinish={onFinish}
        // form={askFrom}
      >
        <div className="wrapper_info">
          <div className="promWrapperText">
            <p>
              Due to the nature of your SIC code, we cannot give your company a predicted R&D benefit, please input your
              phone number and we will give you a call to discuss this.
            </p>
          </div>
          <Col className="gutter-row" span={24}>
            <Form.Item
              name="modal_phone"
              rules={[
                {
                  pattern: /^(\+)(\d+)$/,
                  required: true,
                  message: 'Phone number must start with +, allowed characters is 0-9',
                },
              ]}>
              <Input placeholder="Enter your phone number" style={{ width: '90%', margin: '10px auto 0px auto' }} />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={24}>
            <Form.Item
              name="modal_email"
              rules={[
                {
                  type: 'email',
                  required: true,
                  message: 'Please input your email!',
                },
              ]}>
              <Input placeholder="Enter your the email" style={{ width: '90%', margin: '0px auto 10px auto' }} />
            </Form.Item>
          </Col>
          <div className="wrapper-btn-modal">
            <Button type="primary" htmlType="submit">
              Confirm
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};
export default BenefitModal;
