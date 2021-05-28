import React, { useState } from 'react';
import { Table } from 'antd';
import './style.scss';
import { ColumnVisibilitySVG } from '../../components/icons';
import LayOutAdmin from '../../components/LayOutAdmin';
import { Menu, Dropdown, Checkbox } from 'antd';

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
    perStages: '3% 1/5 Introduction',
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
    perStages: '3% 1/5 Introduction',
    value: '£100,000',
    dateCompleted: '5/19/20',
  },
  {
    key: '3',
    name: 'Dima',
    age: 32,
    address: '10 Downing Street',
    company: 'Angle',
    activeClaim: 'link',
    yearend: '5/19/20',
    dueDate: '5/19/20',
    perStages: '3% 1/5 Introduction',
    value: '£100,000',
    dateCompleted: '5/19/20',
  },
  {
    key: '4',
    name: 'Kris',
    age: 32,
    address: '10 Downing Street',
    company: 'Angle',
    activeClaim: 'link',
    yearend: '5/19/20',
    dueDate: '5/19/20',
    perStages: '3% 1/5 Introduction',
    value: '£100,000',
    dateCompleted: '5/19/20',
  },
  {
    key: '5',
    name: 'Anna',
    age: 32,
    address: '10 Downing Street',
    company: 'Angle',
    activeClaim: 'link',
    yearend: '5/19/20',
    dueDate: '5/19/20',
    perStages: '3% 1/5 Introduction',
    value: '£100,000',
    dateCompleted: '5/19/20',
  },
  {
    key: '6',
    name: 'Oksana',
    age: 32,
    address: '10 Downing Street',
    company: 'Angle',
    activeClaim: 'link',
    yearend: '5/19/20',
    dueDate: '5/19/20',
    perStages: '3% 1/5 Introduction',
    value: '£100,000',
    dateCompleted: '5/19/20',
  },
  {
    key: '7',
    name: 'Lexa',
    age: 32,
    address: '10 Downing Street',
    company: 'Angle',
    activeClaim: 'link',
    yearend: '5/19/20',
    dueDate: '5/19/20',
    perStages: '3% 1/5 Introduction',
    value: '£100,000',
    dateCompleted: '5/19/20',
  },
  {
    key: '8',
    name: 'Misha',
    age: 32,
    address: '10 Downing Street',
    company: 'Angle',
    activeClaim: 'link',
    yearend: '5/19/20',
    dueDate: '5/19/20',
    perStages: '3% 1/5 Introduction',
    value: '£100,000',
    dateCompleted: '5/19/20',
  },
  {
    key: '9',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
    company: 'Angle',
    activeClaim: 'link',
    yearend: '5/19/20',
    dueDate: '5/19/20',
    perStages: '3% 1/5 Introduction',
    value: '£100,000',
    dateCompleted: '5/19/20',
  },
  {
    key: '11',
    name: 'Sofi',
    age: 32,
    address: '10 Downing Street',
    company: 'Angle',
    activeClaim: 'link',
    yearend: '5/19/20',
    dueDate: '5/19/20',
    perStages: '3% 1/5 Introduction',
    value: '£100,000',
    dateCompleted: '5/19/20',
  },
  {
    key: '12',
    name: 'Vlad',
    age: 32,
    address: '10 Downing Street',
    company: 'Angle',
    activeClaim: 'link',
    yearend: '5/19/20',
    dueDate: '5/19/20',
    perStages: '3% 1/5 Introduction',
    value: '£100,000',
    dateCompleted: '5/19/20',
  },
  {
    key: '13',
    name: 'Sergey',
    age: 32,
    address: '10 Downing Street',
    company: 'Angle',
    activeClaim: 'link',
    yearend: '5/19/20',
    dueDate: '5/19/20',
    perStages: '3% 1/5 Introduction',
    value: '£100,000',
    dateCompleted: '5/19/20',
  },
  {
    key: '14',
    name: 'Dima',
    age: 32,
    address: '10 Downing Street',
    company: 'Angle',
    activeClaim: 'link',
    yearend: '5/19/20',
    dueDate: '5/19/20',
    perStages: '3% 1/5 Introduction',
    value: '£100,000',
    dateCompleted: '5/19/20',
  },
  {
    key: '15',
    name: 'Kris',
    age: 32,
    address: '10 Downing Street',
    company: 'Angle',
    activeClaim: 'link',
    yearend: '5/19/20',
    dueDate: '5/19/20',
    perStages: '3% 1/5 Introduction',
    value: '£100,000',
    dateCompleted: '5/19/20',
  },
  {
    key: '16',
    name: 'Anna',
    age: 32,
    address: '10 Downing Street',
    company: 'Angle',
    activeClaim: 'link',
    yearend: '5/19/20',
    dueDate: '5/19/20',
    perStages: '3% 1/5 Introduction',
    value: '£100,000',
    dateCompleted: '5/19/20',
  },
  {
    key: '17',
    name: 'Oksana',
    age: 32,
    address: '10 Downing Street',
    company: 'Angle',
    activeClaim: 'link',
    yearend: '5/19/20',
    dueDate: '5/19/20',
    perStages: '3% 1/5 Introduction',
    value: '£100,000',
    dateCompleted: '5/19/20',
  },
  {
    key: '18',
    name: 'Lexa',
    age: 32,
    address: '10 Downing Street',
    company: 'Angle',
    activeClaim: 'link',
    yearend: '5/19/20',
    dueDate: '5/19/20',
    perStages: '3% 1/5 Introduction',
    value: '£100,000',
    dateCompleted: '5/19/20',
  },
  {
    key: '19',
    name: 'Misha',
    age: 32,
    address: '10 Downing Street',
    company: 'Angle',
    activeClaim: 'link',
    yearend: '5/19/20',
    dueDate: '5/19/20',
    perStages: '3% 1/5 Introduction',
    value: '£100,000',
    dateCompleted: '5/19/20',
  },
  {
    key: '20',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
    company: 'Angle',
    activeClaim: 'link',
    yearend: '5/19/20',
    dueDate: '5/19/20',
    perStages: '3% 1/5 Introduction',
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
    sorter: {},
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
    sorter: {},
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
      sorter: {},
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

  const defaultCheckedList = [
    { title: 'Client name', disabled: true },
    { title: 'Company', disabled: true },
    { title: 'Active claim', disabled: true },
    { title: 'Yearend' },
    { title: 'Due date' },
    { title: 'Progress % of stages' },
    { title: 'Projected value' },
    { title: 'Date completed' },
  ];
  const onChangeBox = (e) => {
    if (!e.target.checked) {
      const filteredColumns = columns.filter((item) => item.title !== e.target.valuePropName);
      setColumns(() => filteredColumns);
    }
    if (e.target.checked) {
      const filteredColumn = dataColumns.filter((item) => item.title === e.target.valuePropName);
      setColumns((prev) => [...prev, ...filteredColumn]);
    }
  };
  const onChange = (pagination, filters, sorter, extra) => {
    //console.log('params', pagination, filters, sorter, extra);
  };

  console.log(columns);

  return (
    <LayOutAdmin>
      <div className="table_wrapper">
        <div className="dropdown_filter" id="drop_down_filter">
          <button className="btn_filter">
            <ColumnVisibilitySVG />
            <Dropdown
              getPopupContainer={() => document.getElementById('drop_down_filter')}
              overlay={
                <Menu>
                  {defaultCheckedList.map(({ title, disabled }) => (
                    <Menu.Item key={title}>
                      <Checkbox defaultChecked={true} onChange={onChangeBox} valuePropName={title} disabled={disabled}>
                        {title}
                      </Checkbox>
                    </Menu.Item>
                  ))}
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
            //showQuickJumper: { goButton: 'Page:' }, // problem
            showSizeChanger: false,
          }}
        />
      </div>
    </LayOutAdmin>
  );
};
export default AdminClientsPage;

//<Menu>
//  <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChangeBox} />
//</Menu>;
