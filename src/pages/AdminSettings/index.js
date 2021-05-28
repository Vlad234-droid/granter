import React, { useState, useEffect, useCallback } from 'react';
import LayOutAdmin from '../../components/LayOutAdmin';
import './style.scss';
import { LogOutSVG } from '../../components/icons';
import { Form, Button, Input } from 'antd';
import { Table } from 'antd';
import { DeleteAdminSVG } from '../../components/icons';

const AdminSettings = () => {
  const [dataTable, setDataTable] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    setDataTable(() => [
      {
        key: '1',
        name: 'Vlad Baryshpolets',
        email: 'fewlnf@gmail.com',
        action: '10 Downing Street',
      },
      {
        key: '2',
        name: 'Sergey Baryshpolets',
        email: 'nkwefnwbnj@gmail.com',
        action: '10 Downing Street',
      },
      {
        key: '3',
        name: 'Dima Baryshpolets',
        email: 'nfewnfwjn@gmail.com',
        action: '10 Downing Street',
      },
    ]);
  }, []);

  const deleteHandler = useCallback((record, dataTable) => {
    const filteredData = dataTable.filter((item) => item.key !== record.key);
    setDataTable(() => filteredData);
  }, []);

  const onFinishName = (value) => {
    console.log(value);
    form.resetFields();
  };
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const columns = [
    {
      title: 'Admin name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      render: (text) => (
        <>
          <div className="wrapper_img_name">
            <img
              src="data:image/png;base64,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"
              alt="photo"
            />
            <h4>{text}</h4>
          </div>
        </>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'company',
    },
    {
      title: 'Action',
      dataIndex: 'delete',
      key: 'delete',
      align: 'right',
      render: (_, record) => {
        return (
          <button onClick={() => deleteHandler(record, dataTable)}>
            <DeleteAdminSVG />
          </button>
        );
      },
    },
  ];

  return (
    <LayOutAdmin>
      <div className="settings_page">
        <div className="box_title_logOut">
          <div className="title">
            <h2>Admins</h2>
          </div>
          <button className="block_log">
            <LogOutSVG />
            <h3>Log out</h3>
          </button>
        </div>

        <Form name="name" layout="vertical" form={form} requiredMark={true} onFinish={onFinishName}>
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                required: true,
                message: 'Type email',
              },
            ]}>
            <Input placeholder="Enter the email" />
          </Form.Item>

          <Form.Item className="registration--submit">
            <Button type="primary" htmlType="submit" /*loading={loader}*/>
              Add
            </Button>
          </Form.Item>
        </Form>

        <Table
          className="table_admins"
          dataSource={dataTable}
          columns={columns}
          onChange={onChange}
          pagination={{
            defaultPageSize: 5,
            pageSize: 5,
            position: ['bottomCenter'],
            showQuickJumper: true,
            showQuickJumper: { goButton: 'Page:' }, // problem
            showSizeChanger: false,
          }}
        />
      </div>
    </LayOutAdmin>
  );
};
export default AdminSettings;
