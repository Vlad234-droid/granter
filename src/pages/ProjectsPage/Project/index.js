import React, { useState, useEffect } from 'react';
import { Form, Select, Button, Input, Upload } from 'antd';
import { useParams } from 'react-router-dom';

import { IconDeleteFile } from '../../../components/icons';
import { removeProject, addDocumentToProject, removeDocumentFromProject } from '../../../core/services';

import iconSelectArrow from '../../../assets/img/iceon-select-arrow.svg';
import iconUpload from '../../../assets/img/icon-upload.svg';
import iconPdf from '../../../assets/img/icon-pdf.svg';

import './style.scss';

const { Option } = Select;
const { Dragger } = Upload;

const Project = ({ field, add, remove, length, form }) => {
  const [status, setStatus] = useState(null);
  const [loaderOnRemove, setLoaderOnRemove] = useState(false);
  const { climeId } = useParams();

  useEffect(() => {
    const status = form.getFieldsValue().projectList[field.key]?.status;
    setStatus(status);
  }, []);

  const customRequest = (e) => {
    const id = form.getFieldsValue().projectList[field.key]?.id;
    if (id) {
      addDocumentToProject(climeId, id, e.file).then((data) => {
        const result = [...form.getFieldsValue().projectList];
        result[field.name].documents = data.documents;
        form.setFieldsValue({
          projectList: result,
        });
      });
    }
    console.log(e);
    e.onSuccess('ok');
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onDeleteProject = (name) => {
    setLoaderOnRemove(true);
    const id = form.getFieldsValue().projectList[field.key]?.id;
    if (id) {
      removeProject(climeId, id)
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

  const onRemoveDocument = (file) => {
    const id = form.getFieldsValue().projectList[field.key]?.id;
    if (id) {
      removeDocumentFromProject(file.claim_id, file.project_id, file.id);
    }
  };

  const statusName = (s) => {
    let status = {};
    switch (s) {
      case 2:
        status = {
          class: 'review',
          name: 'On Review',
        };
        break;
      case 3:
        status = {
          class: 'approved',
          name: 'Approved',
        };
        break;

      default:
        break;
    }
    return status;
  };

  return (
    <div className="project">
      <div className="project__forms">
        {field.name === 0 && (
          <div className="project__forms_title">
            <h2>Active claim title</h2>
            <time>01/01/2021 – 31/12/2021</time>
          </div>
        )}
        <div className="project__form">
          {/* {form.getFieldsValue().projectList.length > } */}
          <button
            type="button"
            className="project__form_remove"
            style={{
              display: length == 1 && !status ? 'none' : '',
            }}
            onClick={() => {
              onDeleteProject(field.name);
            }}>
            <IconDeleteFile />
          </button>
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
                  placeholder="Months"
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
                <Select placeholder="Year" suffixIcon={<img src={iconSelectArrow} alt="" />} className="years-select">
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
                  placeholder="Months"
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
                <Select placeholder="Year" suffixIcon={<img src={iconSelectArrow} alt="" />} className="years-select">
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
          {/* <div className="project__form_submit">
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
          </div> */}
        </div>
      </div>
      <div className="project__docs">
        <h3>Add Related Documents</h3>
        <Form.Item name={[field.name, 'status']} className="hidden">
          <Input hidden />
        </Form.Item>
        {status && (
          <div className="step-file--status">
            <div className={`status ${statusName(status).class}`}>{statusName(status).name}</div>
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
              onRemove={onRemoveDocument}
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
