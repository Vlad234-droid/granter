import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton, Input, Form, Button, Modal, notification } from 'antd';
import { Link, useParams } from 'react-router-dom';

import { postProfileData, fetchUserCompanies } from '../../core/services';
import {
  getClient,
  getClientCompanies,
  getClientActions,
  postEditClient,
  deleteClient,
  deleteComany,
} from '../../core/adminServices';

import { IconEditPencil, IconWarning, IconAdd, CloseIconModal } from '../../components/icons';
import './style.scss';
import actions from '../../core/actions';
import { bindActionCreators } from 'redux';

import LayOutAdmin from '../../components/LayOutAdmin';
import Company from './Company';
import AdminClientActionLog from '../../components/AdminClientActionLog';
import { AdminBackToTablesSVG } from '../../components/icons';
import { useHistory } from 'react-router-dom';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [editModeGeneral, setEditModeGeneral] = useState(false);
  const [profileFormLoader, setProfileFormLoader] = useState(false);
  const [companiesList, setCompaniesList] = useState(null);
  const [clientLogList, setClientLogList] = useState(null);
  const [isClientActionLog, setIsClientActionLog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [appriveIdloading, setAppriveIdloading] = useState(false);
  const [removeClientModal, setRemoveClientModal] = useState(false);
  const [removeComanyModal, setRemoveComanyModal] = useState(false);
  const [removeComanyId, setRemoveComanyId] = useState(false);
  const [profileForm] = Form.useForm();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { setIsBlur } = bindActionCreators(actions, dispatch);
  const isBlur = useSelector((state) => state.modal.isBlur);

  const history = useHistory();

  useEffect(() => {
    getClient(id)
      .then((data) => {
        setUserData(data);
        profileForm.setFieldsValue({
          name: data.profile?.name,
          team_role: data.profile?.team_role,
          address: data.profile?.address,
          enable_notifications: data.profile?.enable_notifications,
          phone: data.profile?.phone,
          id_status: data.profile?.id_status,
        });
      })
      .catch((err) => {
        console.log('UserError', err);
      });
    getClientCompanies(id).then((data) => {
      setCompaniesList(data);
    });

    // fetchProfileData().then((data) => {
    //   setUserData(data);
    //   profileForm.setFieldsValue({
    //     name: data.profile.name,
    //     team_role: data.profile.team_role,
    //     address: data.profile.address,
    //     enable_notifications: data.profile.enable_notifications,
    //     phone: data.profile.phone,
    //   });
    //   fetchUserCompanies(dispatch).then((data) => {
    //     setCompaniesList(data);
    //   });
    // });
  }, []);

  const onSave = (form) => {
    setProfileFormLoader(true);
    postEditClient(userData.id, form).then((data) => {
      setUserData(data);
      setProfileFormLoader(false);
      setEditModeGeneral(false);
      setAppriveIdloading(false);
    });
  };

  const updateCompany = (company) => {
    const result = companiesList.map((item) => {
      if (item.id === company.id) return company;
      return item;
    });
    setCompaniesList(result);
  };

  const onActionLog = () => {
    if (!clientLogList) {
      setLoading(true);
      getClientActions(id).then((data) => {
        setIsClientActionLog(true);
        setClientLogList(data);
        setLoading(false);
      });
    } else {
      setIsClientActionLog(true);
    }
  };

  const onDeleteCompany = () => {
    setLoading(true);
    deleteComany(removeComanyId, id).then((data) => {
      const res = companiesList.filter((item) => item.id !== removeComanyId);
      setCompaniesList(res);
      setIsBlur(false);
      setRemoveComanyModal(false);
      setLoading(false);
      setRemoveComanyId(null);
    });
  };

  const onDeleteClient = () => {
    setLoading(true);
    deleteClient(id).then((data) => {
      notification.success({
        description: 'Client was deleted successfully',
      });
      setIsBlur(false);
      history.push('/admin/clients');
    });
  };

  const onAppruveId = () => {
    profileForm.setFieldsValue({
      id_status: 1,
    });
    profileForm.submit();
    setAppriveIdloading(true);
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
                      <span>{userData.profile?.name}</span>
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
                        {userData.profile?.team_role ? (
                          <span>{userData.profile?.team_role}</span>
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
                      <span>{userData.profile?.address}</span>
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
                  <div className="label">ID Verification status</div>
                  <div className="details">
                    {userData.profile?.id_status === 0 ? (
                      <div className="alert">
                        <IconWarning />
                        <span>Not Verified</span>
                        <Button type="primary" onClick={onAppruveId} loading={appriveIdloading}>
                          Verify
                        </Button>
                      </div>
                    ) : (
                      <div className="success">
                        <span>Verified</span>
                      </div>
                    )}
                  </div>
                  <Form.Item name="id_status" hidden>
                    <Input />
                  </Form.Item>
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
                      <span>{userData.profile?.phone}</span>
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
                {/* <li>
                  <div className="label">Your Password</div>
                  <div className="details">
                    <Link to="/profile/change-password/">Change password</Link>
                  </div>
                </li> */}
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
          <Button
            type="button"
            className="delete_client"
            onClick={() => {
              setRemoveClientModal(true);
              setIsBlur(true);
            }}>
            Delete Client
          </Button>
          <Button type="primary" className="action_logs" onClick={onActionLog} loading={loading}>
            Action Logs
          </Button>
        </div>
      </div>

      <div className="profile__companies">
        <h2>
          <span>My Companies</span>
          <Link to={`/admin/add-company/${id}`}>
            <IconAdd />
          </Link>
        </h2>
        <ul className="profile__companies_list">
          {companiesList &&
            companiesList.map((item) => (
              <Company
                key={`company-${item.id}`}
                company={item}
                companies={companiesList}
                updateCompany={updateCompany}
                setCompaniesList={setCompaniesList}
                setModal={(status, id) => {
                  if (id) setRemoveComanyId(id);
                  setRemoveComanyModal(status);
                  setIsBlur(status);
                }}
              />
            ))}
        </ul>
      </div>
      <Modal
        title="Basic Modal"
        className="delete-client__modal"
        visible={removeClientModal}
        width={700}
        onCancel={() => {
          setIsBlur(false);
          setRemoveClientModal(false);
        }}
        footer={false}
        title={false}
        closeIcon={<CloseIconModal />}>
        <h2>
          Are you sure you want to <br />
          delete client?
        </h2>
        <div className="delete-client__modal_description">
          You are trying to delete the client. If you delete the client — the claim will be deleted along with it.
        </div>
        <div className="delete-client__modal_actions">
          <Button
            type="button"
            onClick={() => {
              setIsBlur(false);
              setRemoveClientModal(false);
            }}>
            Back
          </Button>
          <Button type="primary" loading={loading} onClick={onDeleteClient}>
            Delete
          </Button>
        </div>
      </Modal>
      <Modal
        title="Basic Modal"
        className="delete-client__modal"
        visible={removeComanyModal}
        width={700}
        onCancel={() => {
          setIsBlur(false);
          setRemoveComanyModal(false);
        }}
        footer={false}
        title={false}
        closeIcon={<CloseIconModal />}>
        <h2>
          Are you sure you want to <br />
          delete the company and the claim?
        </h2>
        <div className="delete-client__modal_description">
          You are trying to delete the company which has the Active claim. If you delete the company — the claim will be
          deleted along with it.
        </div>
        <div className="delete-client__modal_actions">
          <Button
            type="button"
            onClick={() => {
              setIsBlur(false);
              setRemoveComanyModal(false);
            }}>
            Back
          </Button>
          <Button type="primary" loading={loading} onClick={onDeleteCompany}>
            Delete
          </Button>
        </div>
      </Modal>
      <AdminClientActionLog
        visible={isClientActionLog}
        list={clientLogList}
        name={userData?.profile?.name}
        onClose={() => {
          setIsClientActionLog(false);
        }}
      />
    </LayOutAdmin>
  );
};

export default ProfilePage;
