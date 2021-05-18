import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Form, Checkbox, Upload, Spin, Input, Select, Skeleton, Dropdown, Menu, Button } from 'antd';
import lockr from 'lockr';

import Layout from '../../components/LayoutDashboard/Layout';
import DocumentRow from './DocumentRow';
import OnDeleteModal from './OnDeleteModal';

import { getDocumentsManagerList, getDownloadList, deleteFile } from '../../core/services';

import { IconDeleteFile, IconDownload, IconFilter } from '../../components/icons';

import iconPdf from '../../assets/img/icon-pdf.svg';
import iconSelectArrow from '../../assets/img/iceon-select-arrow.svg';

import './style.scss';

const { Dragger } = Upload;
const { Option } = Select;

const DocumentsPage = () => {
  const [fileList, setFileList] = useState(null);
  const [filterList, setFilterList] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const { step } = useParams();
  const companyId = useSelector((state) => state.user.currentCompany?.id);
  const token = lockr.get('auth-key');

  useEffect(() => {
    if (companyId) {
      getDocumentsManagerList(step, companyId).then((data) => {
        const list = data.map((item) => {
          const extension = item.original_name.match(/\.[0-9a-z]+$/i)[0];
          if (extension === '.pdf') {
            item.extension = 'pdf';
          } else if (extension === '.doc' || extension === '.docx') {
            item.extension = 'doc';
          } else if (extension === '.xls' || extension === '.xlsx') {
            item.extension = 'xls';
          }
          item.checked = false;
          return item;
        });
        list.sort((a, b) => (a.original_name < b.original_name ? 1 : -1));
        setFileList(list);
        setFilterList(list);
      });
    }
  }, [companyId]);

  const onFilterChange = (changedValues, filters) => {
    console.log(filters);

    let result = fileList.filter((file) => {
      // if (filters.extension.length || filters.claim_id.length || filters.status.length) {
      if (filters.extension.length || filters.status.length) {
        let isExtension;
        let isClaimId;
        let isStatus;
        for (let i in filters) {
          filters[i].forEach((filter) => {
            switch (i) {
              case 'extension':
                isExtension = filters[i].filter((item) => item === file[i]).length ? true : false;
                break;
              case 'claim_id':
                isClaimId = filters[i].filter((item) => item === file[i]).length ? true : false;
                break;
              case 'status':
                isStatus = filters[i].filter((item) => item === file[i]).length ? true : false;
                break;

              default:
                break;
            }
          });
        }

        // console.log("isExtension", isExtension);
        // console.log("isClaimId", isClaimId);
        // console.log("isStatus", isStatus);
        // console.log("----------------------------------");

        if (
          (isExtension || isExtension === undefined) &&
          (isClaimId || isClaimId === undefined) &&
          (isStatus || isStatus === undefined)
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    });
    setFilterList(result);

    console.log(result.length);
  };

  const onFileSelect = (e, id) => {
    const result = [...filterList];
    result.map((item) => {
      if (item.id === id) {
        item.checked = e.target.checked;
      }
      return item;
    });
    setFilterList(result);
    setIsDisabled(result.filter((item) => item.checked).length === 0);
  };

  const onDownloadList = () => {
    const list = filterList.filter((item) => item.checked);
    const stage = list[0].stage;
    getDownloadList(list, stage).then((data) => {
      console.log(data.zip);
      window.open(data.zip);
    });
  };

  const onDeleteFile = (claim_id, id) => {
    deleteFile(claim_id, id).then((data) => {
      const filesListNew = filterList.filter((item) => item.id !== id);
      const filterListNew = filterList.filter((item) => item.id !== id);
      setFileList(filesListNew);
      setFilterList(filterListNew);
    });
  };

  const onSort = (mode) => {
    const result = [...filterList];
    if (mode === 'name') {
      result.sort((a, b) => (a.original_name < b.original_name ? 1 : -1));
    } else if (mode === 'date') {
      result.sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1));
    }
    setFilterList(result);
    console.log(mode);
  };

  return (
    <Layout isLogged={false} className="dashboard documents">
      <div className="documents-wrapper">
        <div className="documents__table">
          <div className="documents__table_head">
            <div className="show">
              <span>Show:</span>
              <Select
                defaultValue="name"
                suffixIcon={<img src={iconSelectArrow} alt="" />}
                dropdownMatchSelectWidth={false}
                getPopupContainer={() => document.querySelector('.documents__table_sort')}
                className="documents__table_sort"
                onChange={onSort}
                //onChange={onChangeMode}
              >
                <Option value="name">by name</Option>
                <Option value="date">by date</Option>
              </Select>
            </div>
            <button className="head--download" disabled={isDisabled} onClick={onDownloadList}>
              <IconDownload />
              <span>Download File</span>
            </button>
            <button
              className="head--delete"
              onClick={() => {
                setModalVisible(true);
              }}
              disabled={isDisabled}>
              <IconDeleteFile />
              <span>Delete Selected</span>
            </button>
          </div>
          <div className="documents__table_body">
            {!filterList ? (
              <Skeleton active />
            ) : filterList.length === 0 ? (
              <div className="documents__table_empty">
                <img src={iconPdf} alt="" />
                <div>No data here at the moment</div>
              </div>
            ) : (
              <table>
                <tbody>
                  {filterList.map((item) => (
                    <DocumentRow key={item.id} file={item} onFileSelect={onFileSelect} onDeleteFile={onDeleteFile} />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <div className="documents__filter">
          <div className="documents__filter_head">
            <IconFilter />
            <span>Filter</span>
          </div>
          <Form
            name="basic"
            initialValues={{
              extension: [],
              claim_id: [],
              status: [],
            }}
            className="documents__filter_form"
            onValuesChange={onFilterChange}>
            <section>
              <h3>Document Type</h3>
              <Form.Item name="extension" valuePropName="checked">
                <Checkbox.Group>
                  <Checkbox value="pdf">PDF</Checkbox>
                  <Checkbox value="doc">Doc</Checkbox>
                  <Checkbox value="xls">Exel</Checkbox>
                </Checkbox.Group>
              </Form.Item>
            </section>
            {/* <section>
                <h3>Claim</h3>
                <Form.Item name="claim_id">
                  <Checkbox.Group>
                    {claims.map((item) => (
                      <Checkbox key={`checkbox-${item.id}`} value={item.id}>
                        <span className="claims--title">{item.title}</span>
                        {item.start_date && item.end_date && (
                          <span className="claims--title">
                            ({item.start_date} - {item.end_date})
                          </span>
                        )}
                      </Checkbox>
                    ))}
                  </Checkbox.Group>
                </Form.Item>
              </section> */}
            <section>
              <h3>Status</h3>
              <Form.Item name="status" valuePropName="checked">
                <Checkbox.Group>
                  <Checkbox value={1}>Waiting</Checkbox>
                  <Checkbox value={2}>On Review</Checkbox>
                  <Checkbox value={3}>Confirmed</Checkbox>
                </Checkbox.Group>
              </Form.Item>
            </section>
          </Form>
        </div>
      </div>
      <OnDeleteModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
      />
    </Layout>
  );
};

export default DocumentsPage;
