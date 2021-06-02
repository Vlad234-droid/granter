import React, { useState, useMemo, useEffect } from 'react';
import { Table, Form } from 'antd';
import './style.scss';
import { ColumnVisibilitySVG } from '../../components/icons';
import LayOutAdmin from '../../components/LayOutAdmin';
import { Menu, Dropdown, Checkbox } from 'antd';
import { searchService } from '../../core/adminServices/getAllClients';

const dataSource = [
  {
    key: '1',
    name: 'Vlad',
    age: 32,
    address: '10 Downing Street',
    company: 'Angle',
    activeClaim: 'link',
    yearend: '5/19/20',
    dueDate: '5/19/20',
    perStages: (
      <div className="wrapper_progress">
        <div>
          <p>3% 1/5 Introduction</p>
          <p>3% 1/5 Introduction</p>
          <p>3% 1/5 Introduction</p>
        </div>
        <div>
          <p>3% 1/5 Introduction</p>
          <p>3% 1/5 Introduction</p>
        </div>
      </div>
    ),
    value: '£100,000',
    dateCompleted: '5/19/20',
  },
  {
    key: '2',
    name: 'Sergey',
    age: 32,
    address: '10 Downing Street',
    company: 'Angle',
    activeClaim: 'link',
    yearend: '5/19/20',
    dueDate: '5/19/20',
    perStages: (
      <div className="wrapper_progress">
        <div>3% 1/5 Introduction 3% 1/5 Introduction 3% 1/5 Introduction</div>
        <div>3% 1/5 Introduction 3% 1/5 Introduction</div>
      </div>
    ),
    value: '£100,000',
    dateCompleted: '5/19/20',
  },
];

const dataColumns = [
  {
    title: 'Client name',
    dataIndex: 'name',
    key: 'name',
    sorter: {},
    render: (text) => <a>{text}</a>,
    disabled: true,
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
    sorter: {},
    disabled: true,
  },
  {
    title: 'Active claim',
    dataIndex: 'activeClaim',
    key: 'activeClaim',
    render: (text) => <a>{text}</a>,
    disabled: true,
  },
  {
    title: 'Yearend',
    dataIndex: 'yearend',
    key: 'yearend',
    sorter: {},
  },
  {
    title: 'Due date',
    dataIndex: 'dueDate',
    key: 'dueDate',
    sorter: {},
  },
  {
    title: 'Progress % of stages',
    dataIndex: 'perStages',
    key: 'perStages',
  },
  {
    title: 'Projected value',
    dataIndex: 'value',
    key: 'value',
    sorter: {},
  },
  {
    title: 'Date completed',
    dataIndex: 'dateCompleted',
    key: 'dateCompleted',
    sorter: {},
  },
];

const AdminClientsPage = () => {
  const [visible, setVisible] = useState(false);
  const [clients, setClients] = useState([]);
  const [columns, setColumns] = useState([
    {
      title: 'Client name',
      dataIndex: 'name',
      key: 'name',
      sorter: {},
      render: (text) => <a>{text}</a>,
      disabled: true,
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      sorter: {},
      disabled: true,
    },
    {
      title: 'Active claim',
      dataIndex: 'activeClaim',
      key: 'activeClaim',
      sorter: {},
      disabled: true,
    },
    {
      title: 'Yearend',
      dataIndex: 'yearend',
      key: 'yearend',
      sorter: {},
    },
    {
      title: 'Due date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      sorter: {},
    },
    {
      title: 'Progress % of stages',
      dataIndex: 'perStages',
      key: 'perStages',
      className: 'td_progress',
    },
    {
      title: 'Projected value',
      dataIndex: 'value',
      key: 'value',
      sorter: {},
    },
    {
      title: 'Date completed',
      dataIndex: 'dateCompleted',
      key: 'dateCompleted',
      sorter: {},
    },
  ]);

  const defaultCheckedList = useMemo(
    () => [
      { title: 'Client name', disabled: true, dataIndex: 'name' },
      { title: 'Company', disabled: true, dataIndex: 'company' },
      { title: 'Active claim', disabled: true, dataIndex: 'activeClaim' },
      { title: 'Yearend', disabled: false, dataIndex: 'yearend' },
      { title: 'Due date', disabled: false, dataIndex: 'dueDate' },
      { title: 'Progress % of stages', disabled: false, dataIndex: 'perStages' },
      { title: 'Projected value', disabled: false, dataIndex: 'value' },
      { title: 'Date completed', disabled: false, dataIndex: 'dateCompleted' },
    ],
    [],
  );

  const onChange = (pagination, filters, sorter, extra) => {
    //console.log('params', pagination, filters, sorter, extra);
  };

  const onFilterChange = (changedValues, filters) => {
    const res = dataColumns.filter((itemData) => filters.checkedProp.includes(itemData.dataIndex));
    setColumns(() => res);
  };

  const onVisibleChange = (flag) => {
    setVisible(() => flag);
  };

  useEffect(() => {
    searchService().then((data) => setClients(() => data));
  }, []);

  console.log('clients', clients);

  return (
    <LayOutAdmin>
      <div className="table_wrapper">
        <div className="dropdown_filter" id="drop_down_filter">
          <button className="btn_filter">
            <ColumnVisibilitySVG />
            <Dropdown
              visible={visible}
              onVisibleChange={onVisibleChange}
              trigger={['click']}
              arrow={false}
              getPopupContainer={() => document.getElementById('drop_down_filter')}
              overlay={
                <Menu>
                  <Menu.Item>
                    <Form
                      initialValues={{
                        checkedProp: [
                          'name',
                          'company',
                          'activeClaim',
                          'yearend',
                          'dueDate',
                          'perStages',
                          'value',
                          'dateCompleted',
                        ],
                      }}
                      name="basic"
                      className="clients__filter_form"
                      onValuesChange={onFilterChange}>
                      <Form.Item name="checkedProp">
                        <Checkbox.Group>
                          {defaultCheckedList.map(({ title, disabled, dataIndex }) => (
                            <Checkbox key={dataIndex} value={dataIndex} disabled={disabled}>
                              {title}
                            </Checkbox>
                          ))}
                        </Checkbox.Group>
                      </Form.Item>
                    </Form>
                  </Menu.Item>
                </Menu>
              }
              placement="bottomRight"
              arrow>
              <h3>Show/Hide Columns</h3>
            </Dropdown>
          </button>
        </div>
        <Table
          dataSource={dataSource}
          columns={columns}
          onChange={onChange}
          pagination={{
            defaultPageSize: 5,
            pageSize: 5,
            position: ['bottomCenter'],
            showQuickJumper: true,
            showSizeChanger: false,
          }}
        />
      </div>
    </LayOutAdmin>
  );
};
export default AdminClientsPage;
