import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Skeleton, Input, Form, Button } from 'antd';
import { Link, useParams } from 'react-router-dom';

import { fetchProfileData, postProfileData, fetchUserCompanies } from '../../core/services';

import { IconEditPencil, IconWarning, IconAdd } from '../../components/icons';
import './style.scss';
import actions from '../../core/actions';
import { bindActionCreators } from 'redux';
import LayOutAdmin from '../../components/LayOutAdmin';
import Company from './Company';
import { AdminBackToTablesSVG } from '../../components/icons';
import { useHistory } from 'react-router-dom';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [editModeGeneral, setEditModeGeneral] = useState(false);
  const [profileFormLoader, setProfileFormLoader] = useState(false);
  const [companiesList, setCompaniesList] = useState(null);
  const [profileForm] = Form.useForm();
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    console.log('ID', id);

    fetchProfileData().then((data) => {
      setUserData(data);
      profileForm.setFieldsValue({
        name: data.profile.name,
        team_role: data.profile.team_role,
        address: data.profile.address,
        enable_notifications: data.profile.enable_notifications,
        phone: data.profile.phone,
      });
      fetchUserCompanies(dispatch).then((data) => {
        setCompaniesList(data);
      });
    });
  }, []);

  useEffect(() => {
    const { userCompaniesLoaded } = bindActionCreators(actions, dispatch);
    userCompaniesLoaded(companiesList);
  }, [companiesList]);

  const onSave = (form) => {
    setProfileFormLoader(true);
    postProfileData(form).then((data) => {
      setUserData(data);
      setProfileFormLoader(false);
      setEditModeGeneral(false);
    });
  };

  const updateCompany = (company) => {
    const result = companiesList.map((item) => {
      if (item.id === company.id) return company;
      return item;
    });
    setCompaniesList(result);
  };

  return (
    <LayOutAdmin>
      <div className="back_to">
        <button
          onClick={() => {
            history.push('/admin/clients');
          }}>
          <div>
            <AdminBackToTablesSVG />
          </div>
          <div className="text_btn">Back to all clients</div>
        </button>
      </div>
      <div className="flex_table_btn">
        <div className="profile__general">
          <div className="profile__general_title">
            <h2>
              <span>Personal Information</span>
              {!editModeGeneral && (
                <button
                  onClick={(e) => {
                    setEditModeGeneral(true);
                  }}>
                  <IconEditPencil />
                </button>
              )}
            </h2>
          </div>

          {!userData ? (
            <Skeleton active />
          ) : (
            <Form
              name="profile"
              form={profileForm}
              // initialValues={{
              //   remember: true,
              // }}
              onFinish={onSave}
              // onFinishFailed={onFinishFailed}
            >
              <ul className="profile__general_table">
                <li>
                  <div className="label">Full Name</div>
                  <div className="details">
                    {!editModeGeneral ? (
                      <span>{userData.profile.name}</span>
                    ) : (
                      <Form.Item
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your name!',
                          },
                        ]}>
                        <Input />
                      </Form.Item>
                    )}
                  </div>
                </li>
                <li>
                  <div className="label">Team Role</div>
                  <div className="details">
                    {!editModeGeneral ? (
                      <>
                        {userData.profile.team_role ? (
                          <span>{userData.profile.team_role}</span>
                        ) : (
                          <div className="alert">
                            <IconWarning />
                            <span>Not Setted</span>
                            <a
                              href=""
                              onClick={(e) => {
                                e.preventDefault();
                                setEditModeGeneral(true);
                              }}>
                              Set the Role
                            </a>
                          </div>
                        )}
                      </>
                    ) : (
                      <Form.Item
                        name="team_role"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your Team Role!',
                          },
                        ]}>
                        <Input />
                      </Form.Item>
                    )}
                  </div>
                </li>
                <li>
                  <div className="label">Registered Address</div>
                  <div className="details">
                    {!editModeGeneral ? (
                      <span>{userData.profile.address}</span>
                    ) : (
                      <Form.Item
                        name="address"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your Registered Address!',
                          },
                        ]}>
                        <Input />
                      </Form.Item>
                    )}
                  </div>
                </li>
                <li>
                  <div className="label">Your Email</div>
                  <div className="details">
                    <span>{userData.email}</span>
                  </div>
                </li>
                <li>
                  <div className="label">Your Phone Number</div>
                  <div className="details">
                    {!editModeGeneral ? (
                      <span>{userData.profile.phone}</span>
                    ) : (
                      <Form.Item
                        name="phone"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your Phone Number!',
                          },
                        ]}>
                        <Input />
                      </Form.Item>
                    )}
                  </div>
                </li>
                <li>
                  <div className="label">Your Password</div>
                  <div className="details">
                    <Link to="/profile/change-password/">Change password</Link>
                  </div>
                </li>
              </ul>
            </Form>
          )}

          {editModeGeneral && (
            <div className="profile__general_actions">
              <Button
                type="button"
                onClick={(e) => {
                  setEditModeGeneral(false);
                }}>
                Cancel
              </Button>
              <Button
                type="primary"
                loading={profileFormLoader}
                onClick={(e) => {
                  profileForm.submit();
                }}>
                Save
              </Button>
            </div>
          )}
        </div>
        <div className="btns_actions">
          <Button type="button" htmlType="submit" className="delete_client">
            Delete Client
          </Button>
          <Button type="primary" className="action_logs">
            Action Logs
          </Button>
        </div>
      </div>

      <div className="profile__companies">
        <h2>
          <span>My Companies</span>
          <Link to="/profile/add-project/">
            <IconAdd />
          </Link>
        </h2>
        <ul className="profile__companies_list">
          {companiesList &&
            companiesList.map((item) => (
              <Company
                key={`company-${item.id}`}
                company={item}
                updateCompany={updateCompany}
                setCompaniesList={setCompaniesList}
              />
            ))}
        </ul>
      </div>
    </LayOutAdmin>
  );
};

export default ProfilePage;
