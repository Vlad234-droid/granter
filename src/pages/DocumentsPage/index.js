import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, Checkbox, Upload, Spin, Input, Select } from "antd";

import Layout from "../../components/LayoutDashboard/Layout";
import { fetchProfileData } from "../../core/services";

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
  const [fileList, setFileList] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);

  useEffect(() => {
    fetchProfileData();
  }, []);

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
            <table>
              <tbody>
                {fileList.map((item, index) => (
                  <tr key={`key-${index}`}>
                    <td className='select'>
                      <Checkbox />
                    </td>
                    <td className='name'>
                      <div className='td-wrapper'>
                        <img src={iconPdf} alt='' />
                        <span>Full company accounts</span>
                      </div>
                    </td>
                    <td className='actions'>
                      <div className='td-wrapper'>
                        <button>
                          <IconDownload />
                        </button>
                        <button>
                          <IconDeleteFile />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='documents__filter'>
          <div className='documents__filter_head'>
            <IconFilter />
            <span>Filter</span>
          </div>
          <Form
            name='basic'
            className='documents__filter_form'
            // onFinish={onFinish}
          >
            <section>
              <h3>Document Type</h3>
              <Form.Item name='pdf' valuePropName='checked'>
                <Checkbox>PDF</Checkbox>
              </Form.Item>
              <Form.Item name='word' valuePropName='checked'>
                <Checkbox>Word</Checkbox>
              </Form.Item>
            </section>
            <section>
              <h3>Claim</h3>
              <Form.Item name='claim-1' valuePropName='checked'>
                <Checkbox>Claim 1</Checkbox>
              </Form.Item>
              <Form.Item name='claim-2' valuePropName='checked'>
                <Checkbox>Claim 2</Checkbox>
              </Form.Item>
            </section>
            <section>
              <h3>Status</h3>
              <Form.Item name='waiting' valuePropName='checked'>
                <Checkbox>Waiting</Checkbox>
              </Form.Item>
              <Form.Item name='onreview' valuePropName='checked'>
                <Checkbox>On Review</Checkbox>
              </Form.Item>
              <Form.Item name='confirmed' valuePropName='checked'>
                <Checkbox>Confirmed</Checkbox>
              </Form.Item>
            </section>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default DocumentsPage;
