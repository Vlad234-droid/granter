import React, { useState } from 'react';
import { Form, Button, Input, notification } from 'antd';
import { Link } from 'react-router-dom';
import Layout from '../../components/LayoutGuest/Layout';

import { IconWarning } from '../../components/icons';

import { fetchResetPassword } from '../../core/services';

import './style.scss';

const ResetPasswordPage = (props) => {
  const [loader, setLoader] = useState(false);
  const onFinish = (values) => {
    setLoader(true);
    fetchResetPassword(values.email)
      .then((data) => {
        notification.success({
          description: 'Check your mail',
        });
        setLoader(false);
      })
      .catch((error) => {
        notification.error({
          className: 'error-message',
          description: 'No such email found',
          icon: <IconWarning />,
        });
        setLoader(false);
      });
  };

  return (
    <Layout isLogged={false} mode="login" className="login-page">
      <div className="login-page__wrapper">
        <h1>Reset a password</h1>
        <Form
          name="name"
          layout="vertical"
          requiredMark={false}
          onFinish={onFinish}
          className="login--form"
          // onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Your Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your Email!' },
              { type: 'email', message: 'Please input correct Email!' },
            ]}>
            <Input placeholder="Enter the email" />
          </Form.Item>
          <Form.Item className="login--submit">
            <Button type="primary" htmlType="submit" loading={loader}>
              Get the reset link
            </Button>
          </Form.Item>
        </Form>
        <div className="login-page--after-text">
          Don’t have an account? <Link to="/welcome/">Sign Up</Link>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPasswordPage;
