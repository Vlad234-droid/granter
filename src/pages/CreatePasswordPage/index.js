import React, { useEffect, useState } from 'react';
import { Form, Button, Input, Tooltip, notification } from 'antd';
import ReactPasswordStrength from 'react-password-strength';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../../components/LayoutGuest/Layout';

import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { IconInfo } from '../../components/icons';

import { fetchCreatePassword } from '../../core/services';

import './style.scss';

const CreatePasswordPage = (props) => {
  const [loader, setLoader] = useState(false);
  const [token, setToken] = useState(null);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form] = Form.useForm();
  const location = useLocation();
  const history = useHistory();
  const email = useSelector((state) => state.user.data?.email);

  useEffect(() => {
    const token = location.search.split('?token=')[1];
    setToken(token);
  }, []);

  const onFinishName = (value) => {
    const form = {
      email: email,
      token: token,
      password: value.password,
      password_confirmation: value.password,
    };
    setLoader(true);
    fetchCreatePassword(form).then((data) => {
      notification.success({
        description: 'Your password has been successfully changed',
      });
      setLoader(false);
      history.push('/sign-in/');
    });
  };

  const changeCallback = (score, password, isValid) => {
    if (score.password) {
      form.setFieldsValue({
        password: score.password,
      });
      form.validateFields(['password']);
    }
  };

  const onFieldsChange = (changedFields, allFields) => {
    const password = changedFields.filter((item) => item.name[0] === 'password')[0];
    if (password) {
      if (password.errors.length) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    }
  };

  return (
    <Layout isLogged={false} mode="login" className="login-page">
      <div className="login-page__wrapper">
        <h1>Create new password</h1>
        <Form
          name="name"
          layout="vertical"
          form={form}
          requiredMark={false}
          onFinish={onFinishName}
          onFieldsChange={onFieldsChange}
          className="change-password--form"
          // onFinishFailed={onFinishFailed}
        >
          <label className="password-controle--label">New Password</label>
          <div className={`password-controle ${passwordError ? 'error' : ''}`}>
            <button
              className="password-controle--show"
              type="button"
              onClick={() => {
                setShowPassword(!showPassword);
              }}>
              {!showPassword && <EyeInvisibleOutlined />}
              {showPassword && <EyeOutlined />}
            </button>
            <ReactPasswordStrength
              className="registration--form-password"
              minLength={8}
              minScore={2}
              tooShortWord="Too short"
              scoreWords={['Weak', 'Okay', 'Good', 'Strong', 'Stronger']}
              changeCallback={changeCallback}
              inputProps={{
                autoComplete: 'off',
                className: 'form-control',
                placeholder: 'Enter the password',
                type: showPassword ? 'text' : 'password',
              }}
            />
            <div className="password-strength-info">
              <span>Password Strength</span>
              <Tooltip
                placement="top"
                title="Use upper and lower case letters, numbers and symbols like !, @, &, $, etc. Don’t use personal info (birth date, etc.)">
                <div className="info--tooltype">
                  <IconInfo />
                </div>
              </Tooltip>
            </div>
          </div>
          <Form.Item
            name="password"
            rules={[
              {
                min: 8,
                message: 'Password must be at least 8 characters!',
              },
              { required: true, message: 'Please input your password!' },
            ]}>
            <Input type="password" hidden />
          </Form.Item>

          <Form.Item className="registration--submit">
            <Button type="primary" htmlType="submit" loading={loader}>
              Create
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

export default CreatePasswordPage;
