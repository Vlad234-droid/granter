import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import './style.scss';
import UploadPhoto from '../../../components/UploadPhoto';
import { AdminCreateClose } from '../../../components/icons/index';
import { createNewAdmin } from '../../../core/adminServices/settingsServices';
import { getAllAdmins } from '../../../core/adminServices/settingsServices';

const CreateAdminModal = ({ setTableLoading, setDataTable, isCreateAdminModal, setIsCreateAdminModal }) => {
  const [form] = Form.useForm();
  const [edit, setEdit] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const onFinish = (values) => {
    createNewAdmin(values.email, values.name, values.password, values.phone, values.avatar).then((data) => {
      if (data.success) {
        setTableLoading(() => true);
        getAllAdmins().then((data) => {
          if (data !== null) {
            const { admins } = data;
            const updatedInfo = admins.map((item) => ({
              name: item.name,
              avatar: item.profile?.avatar,
              email: item.email,
              key: item.email,
            }));
            setDataTable(() => updatedInfo);
            setTableLoading(() => false);
          }
        });
      }
    });
    form.resetFields();
    setIsCreateAdminModal(() => false);
    setEdit(() => false);
  };

  return (
    <Modal
      visible={isCreateAdminModal}
      closeIcon={<AdminCreateClose />}
      onCancel={() => {
        setIsCreateAdminModal(() => false);
      }}
      cancelButtonProps={{ style: { display: 'none' } }}
      okButtonProps={{ style: { display: 'none' } }}
      width={560}
      className="modal_createAdmin">
      <Form name="admin_create" layout="horizontal" form={form} requiredMark={true} onFinish={onFinish}>
        <h2>Add Admin</h2>

        <Form.Item
          name="name"
          label="First Name"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: 'Type first name',
            },
          ]}>
          <Input placeholder="Type first name" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[
            {
              pattern: /^(\+)(\d+)$/,
              required: true,
              message: 'Phone number must start with +, allowed characters is 0-9',
            },
          ]}>
          <Input placeholder="Type phone" />
        </Form.Item>

        <Form.Item
          name="email"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          label="Email"
          rules={[
            {
              type: 'email',
              required: true,
              message: 'Type email',
            },
          ]}>
          <Input placeholder="Type email" />
        </Form.Item>

        <Form.Item
          name="password"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          label="Password"
          rules={[
            { min: 8, message: 'Password must be at least 8 characters!' },
            { required: true, message: 'Please input your password!' },
          ]}>
          <Input type="password" placeholder="Create password" />
        </Form.Item>

        <Form.Item
          className="upload_photo_admin"
          name="avatar"
          valuePropName="fileList"
          rules={[
            {
              required: true,
              message: 'Please upload your avatar!',
            },
          ]}>
          <UploadPhoto setAvatarUrl={setAvatarUrl} avatarUrl={avatarUrl} setEdit={setEdit} edit={edit} form={form} />
        </Form.Item>

        <Form.Item className="submit__create_modal_admin">
          <Button
            type="button"
            onClick={() => {
              setIsCreateAdminModal(() => false);
            }}>
            Back
          </Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default CreateAdminModal;
