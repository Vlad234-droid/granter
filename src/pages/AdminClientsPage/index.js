import React, { useState, useMemo, useEffect } from 'react';
import { Table, Form } from 'antd';
import './style.scss';
import { ColumnVisibilitySVG } from '../../components/icons';
import LayOutAdmin from '../../components/LayOutAdmin';
import { Menu, Dropdown, Checkbox } from 'antd';
import { getAllClients } from '../../core/adminServices/clientServices';
import { forEach } from 'underscore';

// const dataSource = [
//   {
//     key: '1',
//     name: 'Vlad',
//     age: 32,
//     address: '10 Downing Street',
//     company: 'Angle',
//     activeClaim: 'link',
//     yearend: '5/19/20',
//     dueDate: '5/19/20',
//     perStages: (
//       <div className="wrapper_progress">
//         <div>
//           <p>3% 1/5 Introduction</p>
//           <p>3% 1/5 Introduction</p>
//           <p>3% 1/5 Introduction</p>
//         </div>
//         <div>
//           <p>3% 1/5 Introduction</p>
//           <p>3% 1/5 Introduction</p>
//         </div>
//       </div>
//     ),
//     value: '£100,000',
//     dateCompleted: '5/19/20',
//   },
//   {
//     key: '2',
//     name: 'Sergey',
//     age: 32,
//     address: '10 Downing Street',
//     company: 'Angle',
//     activeClaim: 'link',
//     yearend: '5/19/20',
//     dueDate: '5/19/20',
//     perStages: (
//       <div className="wrapper_progress">
//         <div>3% 1/5 Introduction 3% 1/5 Introduction 3% 1/5 Introduction</div>
//         <div>3% 1/5 Introduction 3% 1/5 Introduction</div>
//       </div>
//     ),
//     value: '£100,000',
//     dateCompleted: '5/19/20',
//   },
// ];

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
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      sorter: {},
      disabled: true,
    },
    {
      title: 'Client name',
      dataIndex: 'name',
      key: 'name',
      sorter: {},
      render: (text) => <a>{text}</a>,
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
      { title: 'Company', disabled: true, dataIndex: 'company' },
      { title: 'Client name', disabled: true, dataIndex: 'name' },
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
  const getActiveStage = () => {
    return 'hello';
  };

  useEffect(() => {
    getAllClients().then((data) => {
      console.log(data);
      const newData = [];
      data.forEach((item) => {
        newData.push({
          key: item.id,
          company: item.company,
          activeClaim: <h3 data-key={item.active_claim_id}>link</h3>,
          yearend: item.yearend,
          dueDate: item.dueDate,
          perStages: getActiveStage(),
          value: `£${item.project_value}`,
          dateCompleted: item.date_completed,
        });
      });
      setDataSource(() => newData);
    });
  }, []);

  console.log('dataSource', dataSource);

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
            defaultPageSize: 10,
            pageSize: 10,
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
