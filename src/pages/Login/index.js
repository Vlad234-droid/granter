import React, { useEffect, useState } from "react";
import { Form, Button, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Layout from "../../components/LayoutGuest/Layout";

import services from "../../core/services";

import "./style.scss";

const { fetchLogin } = services;

const LoginPage = (props) => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const onFinish = (values) => {
    setLoader(true);
    fetchLogin(dispatch, values)
      .then((data) => {
        console.log(data);
        setLoader(false);
      })
      .catch(() => {
        setLoader(false);
      });
  };

  return (
    <Layout isLogged={false} mode='login' className='login-page'>
      <div className='login-page__wrapper'>
        <h1>Welcome to Granter</h1>
        <Form
          name='name'
          layout='vertical'
          requiredMark={false}
          onFinish={onFinish}
          className='login--form'
          // onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label='What is your company name or email?'
            name='login'
            rules={[
              { required: true, message: "Please input your company name!" },
            ]}
          >
            <Input placeholder='Enter the email' />
          </Form.Item>
          <Form.Item
            label='What is your password?'
            name='password'
            rules={[
              { required: true, message: "Please input your company name!" },
            ]}
          >
            <Input type='password' placeholder='Enter the password' />
          </Form.Item>
          <Form.Item className='login--submit'>
            <Button type='primary' htmlType='submit' loading={loader}>
              Log In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
};

export default LoginPage;
