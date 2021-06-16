import React, { useState, useEffect, useCallback } from 'react';
import LayOutAdmin from '../../components/LayOutAdmin';
import './style.scss';
import { LogOutSVG } from '../../components/icons';
import { Form, Button, Skeleton, Input, Row, Col } from 'antd';
import { Table } from 'antd';
import { DeleteAdminSVG } from '../../components/icons';
import CreateAdminModal from './CreateAdminModal';
import { getAllAdmins } from '../../core/adminServices/settingsServices';
import DeleteAdminModal from './DeleteAdminModal';
import actions from '../../core/actions';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { logOut } from '../../core/services/logOut';
import { hubspotService } from '../../core/services';

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

  const onFinish = ({ name }) => {
    hubspotService(name).then((data) => console.log(data));
    form.resetFields();
    //createNewAdmin(values.email, values.name, values.password, values.phone, values.avatar).then((data) => {
    //  if (data.success) {
    //    setTableLoading(() => true);
    //    getAllAdmins().then((data) => {
    //      if (data !== null) {
    //        const { admins } = data;
    //        const updatedInfo = admins.map((item) => ({
    //          name: item.name,
    //          avatar: item.profile?.avatar,
    //          email: item.email,
    //          key: item.email,
    //        }));
    //        setDataTable(() => updatedInfo);
    //        setTableLoading(() => false);
    //      }
    //    });
    //  }
    //});
    //form.resetFields();
    //setIsCreateAdminModal(() => false);
    //setEdit(() => false);
  };

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
              // onChange={onChange}
              pagination={{
                defaultPageSize: 3,
                pageSize: 3,
                position: ['bottomCenter'],
                showQuickJumper: true,
                showQuickJumper: { goButton: 'Page:' },
                showSizeChanger: false,
              }}
            />
            <div className="add_link">
              <h2>Link to hubspot</h2>
              <Form
                form={form}
                className="create_link_form"
                layout="horizontal"
                requiredMark={true}
                onFinish={onFinish}>
                <Form.Item name="name" span={50} className="input_link">
                  <Input placeholder="https//:Link to hubspot" />
                </Form.Item>

                <Button type="primary" htmlType="submit" className="save_link">
                  Save
                </Button>
              </Form>
            </div>
          </>
        )}
      </div>
    </LayOutAdmin>
  );
};
export default AdminSettings;
