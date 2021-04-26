import React, { useState } from "react";
import ReactPasswordStrength from "react-password-strength";
import { Form, Button, Input, Tooltip } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { fetchRegistration } from "../../../core/services";

import { IconInfo } from "../../../components/icons";

import "./style.scss";

const RegistrationForm = ({ goNextStep }) => {
  const [loader, setLoader] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form] = Form.useForm();
  const state = useSelector((state) => state.registration);
  const history = useHistory();

  const onFinishName = (value) => {
    const industryIds = [];
    state.industry.forEach((item) => {
      industryIds.push(item.id);
    });
    const form = {
      name: state.name,
      number: state.number,
      email: value.email,
      industry_ids: industryIds,
      password: value.password,
      staffing_costs: state.staffing_costs,
      materials_costs: state.materials_costs,
      subcontracting_costs: state.subcontracting_costs,
      software_costs: state.software_costs,
    };
    setLoader(true);
    fetchRegistration(form).then(() => {
      setLoader(false);
      history.push("/sign-in/");
    });
  };
  const changeCallback = (score, password, isValid) => {
    if (score.password) {
      form.setFieldsValue({
        password: score.password,
      });
      form.validateFields(["password"]);
    }
    // if (score.password) {
    //   if (score.password.length >= 8) {
    //     form.setFieldsValue({
    //       password: score.password,
    //     });
    //   } else {
    //     form.validateFields(["password"]);
    //   }
    // } else {
    //   form.setFieldsValue({
    //     password: "",
    //   });
    //   form.validateFields(["password"]);
    // }
    // if (form.getFieldValue("password").length >= 8) {
    //   setPasswordError(false);
    // } else {
    //   setPasswordError(true);
    // }
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
  const onFinishFailed = (value) => {
    //value.errorFields.
    // if (value.errorFields.filter((item) => item.name[0] === "password").length)
    //   setPasswordError(true);
  };

  return (
    <div className='hello-page__registration'>
      <h1>Welcome to Granter</h1>
      <div className='hello-page__description'>
        Thank you for signing up to a new approach for claiming tax benefits. We
        are excited to be working with you in the future.{" "}
      </div>
      <Form
        name='name'
        layout='vertical'
        form={form}
        requiredMark={false}
        onFinish={onFinishName}
        onFieldsChange={onFieldsChange}
        onFinishFailed={onFinishFailed}
        className='registration--form'
        // onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label='Your Email'
          name='email'
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input placeholder='Enter the email' />
        </Form.Item>
        <div className={`password-controle ${passwordError ? "error" : ""}`}>
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
            { min: 8, message: "Password must be at least 8 characters!" },
            { required: true, message: "Please input your password!" },
          ]}
        >
          <Input type='password' hidden />
        </Form.Item>

        <Form.Item className='registration--submit'>
          <Button type='primary' htmlType='submit' loading={loader}>
            Create an Account
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegistrationForm;
