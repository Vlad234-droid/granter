import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Skeleton,
  Checkbox,
  notification,
  Spin,
  Input,
  Select,
  Form,
  Button,
} from "antd";
import { Link } from "react-router-dom";

import Layout from "../../components/LayoutDashboard/Layout";
import Company from "./Company";

import {
  fetchProfileData,
  postProfileData,
  fetchUserCompanies,
} from "../../core/services";

import { IconEditPencil, IconWarning, IconAdd } from "../../components/icons";

import "./style.scss";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [editModeGeneral, setEditModeGeneral] = useState(false);
  const [profileFormLoader, setProfileFormLoader] = useState(false);
  const [companiesList, setCompaniesList] = useState(null);

  const [profileForm] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProfileData().then((data) => {
      setUserData(data);
      profileForm.setFieldsValue({
        name: data.profile.name,
        team_role: data.profile.team_role,
        address: data.profile.address,
        enable_notifications: data.profile.enable_notifications,
      });
    });
    fetchUserCompanies(dispatch).then((data) => {
      setCompaniesList(data);
    });
  }, []);

  const onSave = (form) => {
    setProfileFormLoader(true);
    postProfileData(form).then((data) => {
      setUserData(data);
      setProfileFormLoader(false);
      setEditModeGeneral(false);
    });
  };

  const enableNotificationsChange = (e) => {
    const form = {
      enable_notifications: e.target.checked ? 1 : 0,
    };
    postProfileData(form).then((data) => {
      console.log(data);
    });
  };

  const updateCompany = (company) => {
    console.log("company", company);
    const result = companiesList.map((item) => {
      if (item.id === company.id) return company;
      return item;
    });
    setCompaniesList(result);
  };

  return (
    <Layout className='dashboard profile'>
      <div className='profile__general'>
        <div className='profile__general_title'>
          <h2>
            <span>Personal Information</span>
            <button
              onClick={(e) => {
                setEditModeGeneral(true);
              }}
            >
              <IconEditPencil />
            </button>
          </h2>
          {editModeGeneral && (
            <Button
              type='button'
              loading={profileFormLoader}
              onClick={(e) => {
                profileForm.submit();
              }}
            >
              Save
            </Button>
          )}
        </div>
        {!userData ? (
          <Skeleton active />
        ) : (
          <Form
            name='profile'
            form={profileForm}
            // initialValues={{
            //   remember: true,
            // }}
            onFinish={onSave}
            // onFinishFailed={onFinishFailed}
          >
            <ul className='profile__general_table'>
              <li>
                <div className='label'>Full Name</div>
                <div className='details'>
                  {!editModeGeneral ? (
                    <span>{userData.profile.name}</span>
                  ) : (
                    <Form.Item
                      name='name'
                      rules={[
                        {
                          required: true,
                          message: "Please input your name!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  )}
                </div>
              </li>
              <li>
                <div className='label'>Team Role</div>
                <div className='details'>
                  {!editModeGeneral ? (
                    <>
                      {userData.profile.team_role ? (
                        <span>{userData.profile.team_role}</span>
                      ) : (
                        <div className='alert'>
                          <IconWarning />
                          <span>Not Setted</span>
                          <a
                            href=''
                            onClick={(e) => {
                              e.preventDefault();
                              setEditModeGeneral(true);
                            }}
                          >
                            Set the Role
                          </a>
                        </div>
                      )}
                    </>
                  ) : (
                    <Form.Item
                      name='team_role'
                      rules={[
                        {
                          required: true,
                          message: "Please input your Team Role!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  )}
                </div>
              </li>
              <li>
                <div className='label'>Registered Address</div>
                <div className='details'>
                  {!editModeGeneral ? (
                    <span>{userData.profile.address}</span>
                  ) : (
                    <Form.Item
                      name='address'
                      rules={[
                        {
                          required: true,
                          message: "Please input your Registered Address!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  )}
                </div>
              </li>
              <li>
                <div className='label'>ID Verification status</div>
                <div className='details'>
                  <div className='alert'>
                    <IconWarning />
                    <span>Not Verified</span>
                    <a href=''>Verify</a>
                  </div>
                </div>
              </li>
              <li>
                <div className='label'>Your Email</div>
                <div className='details'>
                  <span>{userData.email}</span>
                  <Form.Item
                    name='enable_notifications'
                    valuePropName='checked'
                  >
                    <Checkbox onChange={enableNotificationsChange}>
                      Receive all notifications
                    </Checkbox>
                  </Form.Item>
                </div>
              </li>
              <li>
                <div className='label'>Your Phone Number</div>
                <div className='details'>
                  {!editModeGeneral ? (
                    <span>{userData.profile.phone}</span>
                  ) : (
                    <Form.Item
                      name='phone'
                      rules={[
                        {
                          required: true,
                          message: "Please input your Phone Number!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  )}
                </div>
              </li>
              <li>
                <div className='label'>Your Password</div>
                <div className='details'>
                  <Link to='/profile/change-password/'>Change password</Link>
                </div>
              </li>
            </ul>
          </Form>
        )}
      </div>
      <div className='profile__companies'>
        <h2>
          <span>My Companies</span>
          <Link to='/profile/add-project/'>
            <IconAdd />
          </Link>
        </h2>
        <ul className='profile__companies_list'>
          {companiesList &&
            companiesList.map((item) => (
              <Company
                key={`company-${item.id}`}
                company={item}
                updateCompany={updateCompany}
              />
            ))}
        </ul>
      </div>
    </Layout>
  );
};

export default ProfilePage;
