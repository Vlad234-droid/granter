import React, { useState, useEffect, useCallback } from 'react';
import LayOutAdmin from '../../components/LayOutAdmin';
import './style.scss';
import { LogOutSVG } from '../../components/icons';
import { Form, Button, Skeleton } from 'antd';
import { Table } from 'antd';
import { DeleteAdminSVG } from '../../components/icons';
import CreateAdminModal from './CreateAdminModal';
import { getAllAdmins, deleteAdmin } from '../../core/adminServices/settingsServices';

const AdminSettings = () => {
  const [tableLoading, setTableLoading] = useState(false);
  const [dataTable, setDataTable] = useState(null);
  const [isCreateAdminModal, setIsCreateAdminModal] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    getAllAdmins().then((data) => {
      console.log(data);
      if (data !== null) {
        const { admins } = data;
        const updatedInfo = admins.map((item) => ({
          name: item.name,
          avatar: item.profile?.avatar,
          email: item.email,
          key: item.email,
          id: item.id,
        }));
        setDataTable(() => updatedInfo);
      }
    });
  }, []);

  //const deleteHandler = useCallback((record, dataTable) => {}, []);

  const deleteHandler = (record, dataTable) => {
    const filteredData = dataTable.filter((item) => item.key !== record.key);
    deleteAdmin(record.id).then((data) => {
      if (data.success) {
        setDataTable(() => filteredData);
      }
    });
  };

  const onFinishName = (value) => {
    form.resetFields();
  };
  const onChange = (pagination, filters, sorter, extra) => {
    //console.log('params', pagination, filters, sorter, extra);
  };

  const columns = [
    {
      dataIndex: 'avatar',
      className: 'except_avatar',
      render: (text) => (
        <>
          <div className="wrapper_img_name">
            <img src={text} alt="avatar" />
          </div>
        </>
      ),
    },
    {
      title: 'Admin name',
      dataIndex: 'name',
      className: 'except_admin_name',
      sorter: (a, b) => a.name.length - b.name.length,
      render: (text) => (
        <>
          <div className="wrapper_img_name">
            <h4>{text}</h4>
          </div>
        </>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Action',
      dataIndex: 'delete',
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
        {dataTable === null ? (
          <>
            <Skeleton active />
            <Skeleton active />
          </>
        ) : (
          <>
            <div className="box_title_logOut">
              <div className="title">
                <h2>Admins</h2>
              </div>
              <button className="block_log">
                <LogOutSVG />
                <h3>Log out</h3>
              </button>
            </div>

            <Button type="primary" style={{ marginTop: '20px' }} onClick={() => setIsCreateAdminModal(() => true)}>
              Add
            </Button>

            <CreateAdminModal
              setTableLoading={setTableLoading}
              setDataTable={setDataTable}
              isCreateAdminModal={isCreateAdminModal}
              setIsCreateAdminModal={setIsCreateAdminModal}
            />

            <Table
              tableLoading={tableLoading}
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
          </>
        )}
      </div>
    </LayOutAdmin>
  );
};
export default AdminSettings;
