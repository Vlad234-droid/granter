import React, { useState } from 'react';
import { Form, Button, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Layout from '../../components/LayoutGuest/Layout';

import { fetchLogin } from '../../core/services';

import './style.scss';

const LoginPage = (props) => {
  const [loader, setLoader] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    setLoader(true);
    fetchLogin(dispatch, values, history).catch((error) => {
      setLoader(false);
    });
  };

  return (
    <Layout isLogged={false} mode="login" className="login-page">
      <div className="login-page__wrapper">
        <h1>Welcome to Granter</h1>
        <Form name="name" layout="vertical" requiredMark={false} onFinish={onFinish} className="login--form">
          <Form.Item
            label="What is your company number or email?"
            name="login"
            rules={[{ required: true, message: 'Please input your company name!' }]}>
            <Input placeholder="Enter the email" />
          </Form.Item>
          <Form.Item
            label="What is your password?"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input type="password" placeholder="Enter the password" />
          </Form.Item>
          <Form.Item className="login--submit">
            <Button type="primary" htmlType="submit" loading={loader}>
              Log In
            </Button>
          </Form.Item>
        </Form>
        <div className="wrapper_forget">
          <span>Forgot your password?</span>
          <span onClick={() => history.push('/reset-password/')}>Reset a password</span>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
