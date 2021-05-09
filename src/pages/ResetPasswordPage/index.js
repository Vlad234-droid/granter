import React, { useState, useEffect } from "react";
import ReactPasswordStrength from "react-password-strength";

import { Skeleton, Checkbox, Tooltip, Button, Input, Form } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

import Layout from "../../components/LayoutDashboard/Layout";
import { fetchProfileData } from "../../core/services";

import { IconInfo } from "../../components/icons";

import arrowLeft from "../../assets/img/arrow-left.svg";

import "./style.scss";
import { Link } from "react-router-dom";

const ResetPasswordPage = () => {
  const [editModeGeneral, setEditModeGeneral] = useState(false);
  const [loader, setLoader] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form] = Form.useForm();

  const onFinishName = (value) => {
    setLoader(true);
  };

  return (
    <Layout isLogged={false} className='dashboard'>
      <div className='change-password'>
        <div className='change-password__header'>
          <Link to=''>
            <img src={arrowLeft} alt='' />
            <span>To Profile</span>
          </Link>
        </div>
        <div className='change-password__wrapper'>
          <h2>Reset a password</h2>
          <div className='change-password__form'>
            <Form
              name='name'
              layout='vertical'
              requiredMark={false}
              onFinish={onFinishName}
              className='change-password--form'
              // onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label='Your Email'
                name='current'
                rules={[
                  {
                    required: true,
                    message: "Please input your current email!",
                  },
                  {
                    type: "email",
                    message: "Please input correct email!",
                  },
                ]}
              >
                <Input.Password placeholder='Enter your email' />
              </Form.Item>
              <Form.Item className='registration--submit'>
                <Button type='primary' htmlType='submit' loading={loader}>
                  Get the reset link
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPasswordPage;
