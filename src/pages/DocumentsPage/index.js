import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Form,
  Checkbox,
  Upload,
  Spin,
  Input,
  Select,
  Skeleton,
  Dropdown,
  Menu,
  Button,
} from "antd";

import Layout from "../../components/LayoutDashboard/Layout";
import { getDocumentsManagerList, getDownloadList } from "../../core/services";

import {
  IconDeleteFile,
  IconDownload,
  IconFilter,
} from "../../components/icons";

import iconPdf from "../../assets/img/icon-pdf.svg";

import "./style.scss";

const { Dragger } = Upload;
const { Option } = Select;

const DocumentsPage = () => {
  const [fileList, setFileList] = useState(null);
  const [filterList, setFilterList] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const { step } = useParams();
  const claims = useSelector((state) => state.user.currentCompany?.claims);

  useEffect(() => {
    getDocumentsManagerList(step).then((data) => {
      const list = data.map((item) => {
        const extension = item.original_name.match(/\.[0-9a-z]+$/i)[0];
        if (extension === ".pdf") {
          item.extension = "pdf";
        } else if (
          extension === ".xls" ||
          extension === ".xlsx" ||
          extension === ".doc" ||
          extension === ".docx"
        ) {
          item.extension = "word";
        }
        item.checked = false;
        return item;
      });
      setFileList(list);
      setFilterList(list);
    });
  }, []);

  const onFilterChange = (changedValues, filters) => {
    console.log(filters);

    let result = fileList.filter((file) => {
      if (
        filters.extension.length ||
        filters.claim_id.length ||
        filters.status.length
      ) {
        let isExtension;
        let isClaimId;
        let isStatus;
        for (let i in filters) {
          filters[i].forEach((filter) => {
            switch (i) {
              case "extension":
                isExtension = filters[i].filter((item) => item === file[i])
                  .length
                  ? true
                  : false;
                break;
              case "claim_id":
                isClaimId = filters[i].filter((item) => item === file[i]).length
                  ? true
                  : false;
                break;
              case "status":
                isStatus = filters[i].filter((item) => item === file[i]).length
                  ? true
                  : false;
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
    // getDownloadList(list).then((data) => {
    //   console.log(data);
    // });
  };

  return (
    <Layout isLogged={false} className='dashboard documents'>
      <div>
        <form action='http://granter.get-code.net/api/public/documents/download/list'>
          <input type='text' name='document_ids[0]' value='607' />
          <input type='text' name='document_ids[1]' value='608' />
          <input type='submit' value='Go' />
        </form>
      </div>
      <div className='documents-wrapper'>
        <div className='documents__table'>
          <div className='documents__table_head'>
            <div className='show'>
              <span>Show:</span>
            </div>
            <button
              className='head--download'
              disabled={isDisabled}
              onClick={onDownloadList}
            >
              <IconDownload />
              <span>Download File</span>
            </button>
            <button className='head--delete' disabled={isDisabled}>
              <IconDeleteFile />
              <span>Delete Selected</span>
            </button>
          </div>
          <div className='documents__table_body'>
            {!filterList ? (
              <Skeleton active />
            ) : (
              <table>
                <tbody>
                  {filterList.map((item) => (
                    <tr key={`key-${item.id}`}>
                      <td className='select'>
                        <Checkbox
                          onChange={(e) => {
                            onFileSelect(e, item.id);
                          }}
                          checked={item.checked}
                        />
                      </td>
                      <td className='name'>
                        <div className='td-wrapper'>
                          <Link to={`/document/${item.claim_id}/${item.id}/`}>
                            <img src={iconPdf} alt='' />
                            <span>{item.original_name}</span>
                          </Link>
                        </div>
                      </td>
                      <td className='actions'>
                        <div className='td-wrapper'>
                          <a href={item.url} target='_blank'>
                            <IconDownload />
                          </a>
                          <button>
                            <IconDeleteFile />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <div className='documents__filter'>
          <div className='documents__filter_head'>
            <IconFilter />
            <span>Filter</span>
          </div>
          {!claims ? (
            <Skeleton active />
          ) : (
            <Form
              name='basic'
              initialValues={{
                extension: [],
                claim_id: [],
                status: [],
              }}
              className='documents__filter_form'
              onValuesChange={onFilterChange}
            >
              <section>
                <h3>Document Type</h3>
                <Form.Item name='extension' valuePropName='checked'>
                  <Checkbox.Group>
                    <Checkbox value='pdf'>PDF</Checkbox>
                    <Checkbox value='word'>Word</Checkbox>
                  </Checkbox.Group>
                </Form.Item>
              </section>
              <section>
                <h3>Claim</h3>
                <Form.Item name='claim_id'>
                  <Checkbox.Group>
                    {claims.map((item) => (
                      <Checkbox key={`checkbox-${item.id}`} value={item.id}>
                        <span className='claims--title'>{item.title}</span>
                        {item.start_date && item.end_date && (
                          <span className='claims--title'>
                            ({item.start_date} - {item.end_date})
                          </span>
                        )}
                      </Checkbox>
                    ))}
                  </Checkbox.Group>
                </Form.Item>
              </section>
              <section>
                <h3>Status</h3>
                <Form.Item name='status' valuePropName='checked'>
                  <Checkbox.Group>
                    <Checkbox value={1}>Waiting</Checkbox>
                    <Checkbox value={2}>On Review</Checkbox>
                    <Checkbox value={3}>Confirmed</Checkbox>
                  </Checkbox.Group>
                </Form.Item>
              </section>
            </Form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DocumentsPage;
