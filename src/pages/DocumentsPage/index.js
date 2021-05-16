import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Form, Checkbox, Upload, Spin, Input, Select, Skeleton } from "antd";

import Layout from "../../components/LayoutDashboard/Layout";
import { getDocumentsManagerList } from "../../core/services";

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
  const { step } = useParams();
  const claims = useSelector((state) => state.user.currentCompany?.claims);

  useEffect(() => {
    getDocumentsManagerList(step).then((data) => {
      console.log("extension", data);
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
        item.chacked = false;
        return item;
      });
      setFileList(list);
      setFilterList(list);
      console.log(list);
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

  return (
    <Layout isLogged={false} className='dashboard documents'>
      <div className='documents-wrapper'>
        <div className='documents__table'>
          <div className='documents__table_head'>
            <div className='show'>
              <span>Show:</span>
              <b>by date</b>
            </div>
            <a href='/' className='head--download disabled'>
              <IconDownload />
              <span>Download File</span>
            </a>
            <button className='head--delete' disabled>
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
                        <Checkbox checked={item.chacked} />
                      </td>
                      <td className='name'>
                        <div className='td-wrapper'>
                          <img src={iconPdf} alt='' />
                          <span>{item.original_name}</span>
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
                      <Checkbox value={item.id}>
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
