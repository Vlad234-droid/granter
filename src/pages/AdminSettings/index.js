import React, { useState, useEffect, useCallback } from 'react';
import LayOutAdmin from '../../components/LayOutAdmin';
import './style.scss';
import { LogOutSVG } from '../../components/icons';
import { Form, Button, Skeleton } from 'antd';
import { Table } from 'antd';
import { DeleteAdminSVG } from '../../components/icons';
import CreateAdminModal from './CreateAdminModal';
import { getAllAdmins } from '../../core/adminServices/settingsServices';
import DeleteAdminModal from './DeleteAdminModal';
import actions from '../../core/actions';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { logOut } from '../../core/services/logOut';

const AdminSettings = () => {
  const [tableLoading, setTableLoading] = useState(false);
  const [dataTable, setDataTable] = useState(null);
  const [isCreateAdminModal, setIsCreateAdminModal] = useState(false);
  const [isDeleteAdminModal, setIsDeleteAdminModal] = useState(false);
  const [filteredListAdmins, setFilteredListAdmins] = useState([]);
  const [recordId, setRecordId] = useState('');
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { setIsBlur } = bindActionCreators(actions, dispatch);

  useEffect(() => {
    getAllAdmins().then((data) => {
      console.log('data', data);
      if (data !== null) {
        const { admins } = data;
        const updatedInfo = admins.map((item) => ({
          name: item.name,
          avatar: item.profile?.avatar,
          phone: item.profile?.phone,
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
    setFilteredListAdmins(() => filteredData);
    setRecordId(() => record.id);
    setIsDeleteAdminModal(() => true);
    setIsBlur(true);
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
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Action',
      dataIndex: 'delete',
      align: 'right',
      className: 'deleteBtn',
      render: (_, record) => {
        return (
          <button onClick={() => deleteHandler(record, dataTable)} style={{ padding: '2px', cursor: 'pointer' }}>
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
              <button className="block_log" onClick={() => logOut(dispatch)}>
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

            <DeleteAdminModal
              setFilteredListAdmins={setFilteredListAdmins}
              setRecordId={setRecordId}
              recordId={recordId}
              filteredListAdmins={filteredListAdmins}
              setDataTable={setDataTable}
              isDeleteAdminModal={isDeleteAdminModal}
              setIsDeleteAdminModal={setIsDeleteAdminModal}
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
                showQuickJumper: { goButton: 'Page:' },
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
