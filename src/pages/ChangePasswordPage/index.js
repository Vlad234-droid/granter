import React, { useState, useEffect } from "react";
import ReactPasswordStrength from "react-password-strength";
import { useHistory } from "react-router-dom";

import { Skeleton, notification, Tooltip, Button, Input, Form } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

import Layout from "../../components/LayoutDashboard/Layout";
import { fetchChacngePassword } from "../../core/services";

import { IconInfo } from "../../components/icons";

import arrowLeft from "../../assets/img/arrow-left.svg";

import "./style.scss";
import { Link } from "react-router-dom";

const ChangePasswordPage = () => {
  const [editModeGeneral, setEditModeGeneral] = useState(false);
  const [loader, setLoader] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();

  const onFinishName = (values) => {
    setLoader(true);
    fetchChacngePassword(values)
      .then((data) => {
        setLoader(false);
        console.log("AAaa", data);
        notification.success({
          description: data,
        });
        history.push("/profile/");
      })
      .catch((error) => {
        setLoader(false);
      });
  };

  const changeCallback = (score, password, isValid) => {
    if (score.password) {
      form.setFieldsValue({
        password: score.password,
      });
      form.validateFields(["password"]);
    }
  };

  const onFieldsChange = (changedFields, allFields) => {
    const password = changedFields.filter(
      (item) => item.name[0] === "password"
    )[0];
    if (password) {
      if (password.errors.length) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    }
  };

  return (
    <Layout isLogged={false} className='dashboard'>
      <div className='change-password'>
        <div className='change-password__title'>
          <Link to=''>
            <img src={arrowLeft} alt='' />
            <span>To Profile</span>
          </Link>
        </div>
        <div className='change-password__wrapper'>
          <h2>Change password</h2>
          <div className='change-password__description'>
            <b>Choose a Strong Password</b>. A strong password contains a mix of
            numbers, letters, and symbols. It is hard to guess, does not
            resemble a real word, and is only used for this account.
          </div>
          <div className='change-password__form'>
            <Form
              name='name'
              layout='vertical'
              form={form}
              requiredMark={false}
              onFinish={onFinishName}
              onFieldsChange={onFieldsChange}
              className='change-password--form'
              // onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label='Current Password'
                name='current_password'
                rules={[
                  {
                    required: true,
                    message: "Please input your current password!",
                  },
                  {
                    min: 8,
                    message: "Password must be at least 8 characters!",
                  },
                ]}
              >
                <Input.Password placeholder='Enter current password' />
              </Form.Item>
              <label className='password-controle--label'>New Password</label>
              <div
                className={`password-controle ${passwordError ? "error" : ""}`}
              >
                <button
                  className='password-controle--show'
                  type='button'
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {!showPassword && <EyeInvisibleOutlined />}
                  {showPassword && <EyeOutlined />}
                </button>
                <ReactPasswordStrength
                  className='registration--form-password'
                  minLength={8}
                  minScore={2}
                  tooShortWord='Too short'
                  scoreWords={["Weak", "Okay", "Good", "Strong", "Stronger"]}
                  changeCallback={changeCallback}
                  inputProps={{
                    autoComplete: "off",
                    className: "form-control",
                    placeholder: "Enter the password",
                    type: showPassword ? "text" : "password",
                  }}
                />
                <div className='password-strength-info'>
                  <span>Password Strength</span>
                  <Tooltip
                    placement='top'
                    title='Use upper and lower case letters, numbers and symbols like !, @, &, $, etc. Don’t use personal info (birth date, etc.)'
                  >
                    <div className='info--tooltype'>
                      <IconInfo />
                    </div>
                  </Tooltip>
                </div>
              </div>
              <Form.Item
                name='password'
                rules={[
                  {
                    min: 8,
                    message: "Password must be at least 8 characters!",
                  },
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input type='password' hidden />
              </Form.Item>

              <Form.Item className='registration--submit'>
                <Button type='primary' htmlType='submit' loading={loader}>
                  Save changes
                </Button>
              </Form.Item>
            </Form>
            <div className='change-password__forgot'>
              Forgot your password?{" "}
              <Link to='/profile/reset-password/'>Reset a password</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChangePasswordPage;
