import React, { useState, useEffect } from 'react';
import { Form, Select, Button, Input, Upload } from 'antd';
import { useParams } from 'react-router-dom';

import { IconDeleteFile } from '../../../components/icons';
import { removeSubProject } from '../../../core/services';

import iconSelectArrow from '../../../assets/img/iceon-select-arrow.svg';
import iconUpload from '../../../assets/img/icon-upload.svg';
import iconPdf from '../../../assets/img/icon-pdf.svg';

import './style.scss';

const { Option } = Select;
const { Dragger } = Upload;

const Project = ({ field, add, remove, length, form }) => {
  const [fileList, setFileList] = useState([]);
  const [loaderOnRemove, setLoaderOnRemove] = useState(false);
  const { climeId } = useParams();

  useEffect(() => {
    console.log('field', field);
  }, []);

  const customRequest = (e) => {
    const files = [...fileList];
    files.push(e.file);
    setFileList(files);
    console.log(field);
    e.onSuccess('ok');
  };

  const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  const onDeleteProject = (name) => {
    setLoaderOnRemove(true);
    const id = form.getFieldsValue().projectList[field.key]?.id;
    if (id) {
      removeSubProject(climeId, id)
        .then((data) => {
          setLoaderOnRemove(false);
          remove(name);
        })
        .catch((error) => {
          setLoaderOnRemove(false);
        });
    } else {
      remove(name);
    }
  };

  return (
    <div className="project">
      <div className="project__forms">
        {field.key === 0 && (
          <div className="project__forms_title">
            <h2>Active claim title</h2>
            <time>01/01/2021 – 31/12/2021</time>
          </div>
        )}
        <div className="project__form">
          <div className="project__form_inputs">
            <Form.Item
              label="Project Title"
              name={[field.name, 'title']}
              rules={[
                {
                  validator: (_, value) =>
                    value && value.trim().length
                      ? Promise.resolve()
                      : Promise.reject(new Error('Please input your facility title!')),
                },
              ]}>
              <Input placeholder="Enter the title" />
            </Form.Item>
          </div>
          <div className="project__form_dates">
            <div className="start-dates">
              <Form.Item name={[field.name, 'start-months']} label="Start Date">
                <Select
                  placeholder="Please select start months"
                  suffixIcon={<img src={iconSelectArrow} alt="" />}
                  className="months-select">
                  <Option value={0}>January</Option>
                  <Option value={1}>February</Option>
                  <Option value={2}>March</Option>
                  <Option value={3}>April</Option>
                  <Option value={4}>May</Option>
                  <Option value={5}>June</Option>
                  <Option value={6}>July</Option>
                  <Option value={7}>August</Option>
                  <Option value={8}>September</Option>
                  <Option value={9}>October</Option>
                  <Option value={10}>November</Option>
                  <Option value={11}>December</Option>
                </Select>
              </Form.Item>
              <Form.Item name={[field.name, 'start-year']}>
                <Select
                  placeholder="Please select start year"
                  suffixIcon={<img src={iconSelectArrow} alt="" />}
                  className="years-select">
                  <Option value="2021">2021</Option>
                  <Option value="2020">2020</Option>
                  <Option value="2019">2019</Option>
                  <Option value="2018">2018</Option>
                  <Option value="2017">2017</Option>
                </Select>
              </Form.Item>
            </div>
            <div className="end-dates">
              <Form.Item name={[field.name, 'end-months']} label="End Date">
                <Select
                  placeholder="Please select start months"
                  className="months-select"
                  suffixIcon={<img src={iconSelectArrow} alt="" />}>
                  <Option value={0}>January</Option>
                  <Option value={1}>February</Option>
                  <Option value={2}>March</Option>
                  <Option value={3}>April</Option>
                  <Option value={4}>May</Option>
                  <Option value={5}>June</Option>
                  <Option value={6}>July</Option>
                  <Option value={7}>August</Option>
                  <Option value={8}>September</Option>
                  <Option value={9}>October</Option>
                  <Option value={10}>November</Option>
                  <Option value={11}>December</Option>
                </Select>
              </Form.Item>
              <Form.Item name={[field.name, 'end-year']}>
                <Select
                  placeholder="Please select start year"
                  suffixIcon={<img src={iconSelectArrow} alt="" />}
                  className="years-select">
                  <Option value="2021">2021</Option>
                  <Option value="2020">2020</Option>
                  <Option value="2019">2019</Option>
                  <Option value="2018">2018</Option>
                  <Option value="2017">2017</Option>
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="project__form_inputs">
            <Form.Item label="Objectives" name={[field.name, 'objectives']}>
              <Input.TextArea placeholder="Enter objectives" style={{ height: 112 }} />
            </Form.Item>
          </div>
          <div className="project__form_inputs">
            <Form.Item label="Non-Routine Challenges" name={[field.name, 'challenges']}>
              <Input.TextArea placeholder="Enter challenges" style={{ height: 156 }} />
            </Form.Item>
          </div>
          <Form.Item hidden name={[field.name, 'id']}>
            <Input />
          </Form.Item>
          <div className="project__form_submit">
            {length === 1 ? (
              <>
                <Button
                  type="button"
                  onClick={() => {
                    add();
                  }}>
                  Add One More Project
                </Button>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Add Project to Dashboard
                  </Button>
                </Form.Item>
              </>
            ) : (
              <Button
                type="button"
                className="remove-project"
                loading={loaderOnRemove}
                onClick={() => {
                  onDeleteProject(field.name);
                }}>
                Remove
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="project__docs">
        <h3>Add Related Documents</h3>
        <Form.Item name={[field.name, 'status']}>
          <Input hidden />
        </Form.Item>
        {field.id && (
          <div className="project__docs_status">
            <div className="status review">On Review</div>
          </div>
        )}
        <div className="project__docs_list">
          <Form.Item
            name={[field.name, 'documents']}
            valuePropName="fileList"
            getValueFromEvent={normFile}
            className="documents">
            <Upload
              customRequest={customRequest}
              showUploadList={{
                showDownloadIcon: false,
                showRemoveIcon: true,
                removeIcon: <IconDeleteFile />,
              }}
              // showUploadList={false}
              accept="application/pdf, application/msword,
            application/vnd.openxmlformats-officedocument.wordprocessingml.document,
            application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
              <img src={iconUpload} alt="" />
              <span>Add the Document</span>
            </Upload>
          </Form.Item>
          {/* <Dragger
            customRequest={customRequest}
            showUploadList={false}
            accept="application/pdf, application/msword,
            application/vnd.openxmlformats-officedocument.wordprocessingml.document,
            application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"></Dragger> */}
          {/* <ul className="file--list">
            {fileList.map((item) => (
              <li key={item.lastModified}>
                <img src={iconPdf} alt="" />
                <span>{item.name}</span>
                <button
                  type="button"
                  className="file--list-remove"
                  onClick={() => {
                    onDelete(item);
                  }}>
                  <IconDeleteFile />
                </button>
              </li>
            ))}
          </ul> */}
        </div>
      </div>
    </div>
  );
};

export default Project;
