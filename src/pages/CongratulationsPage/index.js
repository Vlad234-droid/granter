import React from 'react';
import Layout from '../../components/LayoutDashboard/Layout';
import { Form, Button, Input } from 'antd';
import './style.scss';
import { config } from './config';

const CongratulationsPage = () => {
  const [form] = Form.useForm();
  const onFinishName = (value) => {
    console.log(value);
    form.resetFields();
  };

  return (
    <Layout className="dashboard">
      <div className="congrat_wrapper">
        <h2>Congratulations!</h2>
        <div className="cards_wrapper">
          {config.map(({ nameClass, title, text, circleSVG }) => (
            <div className={nameClass}>
              <h3>{title}</h3>
              <p>{text}</p>
              <div className="circle">{circleSVG}</div>
            </div>
          ))}
        </div>
        <div className="email_block">
          <Form name="name" layout="vertical" form={form} requiredMark={true} onFinish={onFinishName}>
            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  required: true,
                  message: 'Type email',
                },
              ]}>
              <Input placeholder="Enter the email" />
            </Form.Item>

            <Form.Item className="registration--submit">
              <Button type="primary" htmlType="submit" /*loading={loader}*/>
                Send to Accountant
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  );
};
export default CongratulationsPage;
