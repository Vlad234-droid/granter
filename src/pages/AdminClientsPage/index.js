import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Table, Form } from 'antd';
import './style.scss';
import { ColumnVisibilitySVG } from '../../components/icons';
import LayOutAdmin from '../../components/LayOutAdmin';
import { Menu, Dropdown, Checkbox, Pagination, Skeleton } from 'antd';
import { getAllClients } from '../../core/adminServices/clientServices';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../core/actions';

const AdminClientsPage = () => {
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState(null);
  const [tableLoading, setTableLoading] = useState(false);
  const [totalCountPages, setTotalCountPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(0);
  const [sorterType, setSorterType] = useState('');
  const [currentColumnKey, setCurrentColumnKey] = useState('');
  const dispatch = useDispatch();
  const { pageAdminClientsGLOBAL } = useSelector((state) => state.modal);
  const { setCurrentPageGLOBAL } = bindActionCreators(actions, dispatch);
  const dataColumns = useMemo(
    () => [
      {
        title: 'Company',
        dataIndex: 'company',
        key: 'company',
        sorter: {},
        disabled: true,
      },
      {
        title: 'Client name',
        dataIndex: 'client_name',
        key: 'client_name',
        sorter: {},
        disabled: true,
      },
      {
        title: 'Active claim',
        dataIndex: 'active_claim_id',
        key: 'active_claim_id',
        disabled: true,
      },
      {
        title: 'Yearend',
        dataIndex: 'yearned',
        key: 'yearned',
        sorter: {},
      },
      {
        title: 'Due date',
        dataIndex: 'due_date',
        key: 'due_date',
        sorter: {},
      },
      {
        title: 'Progress % of stages',
        dataIndex: 'perStages',
        key: 'perStages',
      },
      {
        title: 'Projected value',
        dataIndex: 'project_value',
        key: 'project_value',
        sorter: {},
      },
      {
        title: 'Date completed',
        dataIndex: 'date_completed',
        key: 'date_completed',
        sorter: {},
      },
    ],
    [],
  );
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
      dataIndex: 'client_name',
      key: 'client_name',
      sorter: {},
      disabled: true,
      sorter: {},
    },
    {
      title: 'Active claim',
      dataIndex: 'active_claim_id',
      key: 'active_claim_id',
      sorter: {},
      disabled: true,
    },
    {
      title: 'Yearend',
      dataIndex: 'yearned',
      key: 'yearned',
      sorter: {},
    },
    {
      title: 'Due date',
      dataIndex: 'due_date',
      key: 'due_date',
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
      dataIndex: 'project_value',
      key: 'project_value',
      sorter: {},
    },
    {
      title: 'Date completed',
      dataIndex: 'date_completed',
      key: 'date_completed',
      sorter: {},
    },
  ]);

  const defaultCheckedList = useMemo(
    () => [
      { title: 'Company', disabled: true, dataIndex: 'company' },
      { title: 'Client name', disabled: true, dataIndex: 'client_name' },
      { title: 'Active claim', disabled: true, dataIndex: 'active_claim_id' },
      { title: 'Yearend', disabled: false, dataIndex: 'yearned' },
      { title: 'Due date', disabled: false, dataIndex: 'due_date' },
      { title: 'Progress % of stages', disabled: false, dataIndex: 'perStages' },
      { title: 'Projected value', disabled: false, dataIndex: 'project_value' },
      { title: 'Date completed', disabled: false, dataIndex: 'date_completed' },
    ],
    [],
  );

  useEffect(() => {
    let cleanupFunction = false;

    if (pageAdminClientsGLOBAL !== null) {
      setCurrentPage(() => pageAdminClientsGLOBAL);
      setTableLoading(() => true);
      getAllClients(pageAdminClientsGLOBAL).then((data) => {
        if (!cleanupFunction) setPageInfo(data);
      });
      return;
    }
    getAllClients(currentPage).then((data) => {
      if (!cleanupFunction) setPageInfo(data);
    });
    return () => {
      cleanupFunction = true;
    };
  }, [pageAdminClientsGLOBAL]);

  const onChange = (pagination, filters, sorter, extra) => {
    setTableLoading(() => true);
    setSorterType(() => sorter.order);
    setCurrentColumnKey(() => sorter.columnKey);
    if (sorter.order === undefined)
      return getAllClients(currentPage).then((data) => {
        setPageInfo(data);
        setSorterType(() => '');
        setCurrentColumnKey(() => '');
      });

    getAllClients(currentPage, sorter.columnKey, sorter.order).then((data) => {
      setPageInfo(data);
    });
  };

  const onFilterChange = (changedValues, filters) => {
    const res = dataColumns.filter((itemData) => filters.checkedProp.includes(itemData.dataIndex));
    setColumns(() => res);
  };

  const onVisibleChange = (flag) => {
    setVisible(() => flag);
  };

  const onChangeSizePage = (page) => {
    if (currentColumnKey !== '' && sorterType !== '') {
      setCurrentPage(() => page);
      setTableLoading(() => true);
      setCurrentPageGLOBAL(page);

      return getAllClients(page, currentColumnKey, sorterType).then((data) => {
        setPageInfo(data);
      });
    }
    setCurrentPage(() => page);
    setTableLoading(() => true);
    setCurrentPageGLOBAL(page);
    getAllClients(page).then((data) => {
      setPageInfo(data);
    });
  };

  const setPageInfo = useCallback(
    (data) => {
      const { companies, total_count, per_page } = data;
      setTotalCountPages(() => total_count);
      setPerPage(() => per_page);
      const newData = [];
      companies.forEach((item) => {
        newData.push({
          key: item.id,
          client_name: (
            <h3 className="active_client_name">
              <Link to={`/admin/client/${item.client_id}`}>
                {item.client_name === null ? 'Go to profile' : item.client_name}
              </Link>
            </h3>
          ),
          company: item.company,
          active_claim_id: (
            <h3 className="active_claim_id">
              <Link to={`/admin/active-claim/${item.active_claim_id}`}>link</Link>
            </h3>
          ),
          yearned: item.yearned,
          due_date: item.due_date,
          perStages: getActiveStage(item.progress),
          project_value: checkForValue(item.project_value),
          date_completed: item.date_completed,
        });
      });
      setDataSource(() => newData);
      setTableLoading(() => false);
    },
    [dataSource],
  );
  const getActiveStage = (progressComp) => {
    let approvedClaims = 0;
    Object.values(progressComp).forEach((step) => {
      if (step.in_done) approvedClaims++;
    });
    return `${approvedClaims} / ${Object.keys(progressComp).length} Approved`;
  };

  const checkForValue = (value) => {
    if (value === null) return '£ 0';
    return `£ ${value}`;
  };

  return (
    <LayOutAdmin>
      <div className="table_wrapper">
        {dataSource === null ? (
          <div className="clients_admin_skeletons">
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </div>
        ) : (
          <>
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
                      <Menu.Item key="menu_item_drop">
                        <Form
                          initialValues={{
                            checkedProp: [
                              'company',
                              'client_name',
                              'active_claim_id',
                              'yearned',
                              'due_date',
                              'perStages',
                              'project_value',
                              'date_completed',
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
              loading={tableLoading}
              dataSource={dataSource}
              columns={columns}
              onChange={onChange}
              pagination={false}
            />
            <div className="pagination_clients">
              <Pagination
                showSizeChanger={false}
                pageSize={perPage}
                total={totalCountPages}
                current={currentPage}
                showQuickJumper
                showLessItems={false}
                onChange={onChangeSizePage}
                hideOnSinglePage={totalCountPages <= perPage ? true : false}
              />
            </div>
          </>
        )}
      </div>
    </LayOutAdmin>
  );
};
export default AdminClientsPage;
