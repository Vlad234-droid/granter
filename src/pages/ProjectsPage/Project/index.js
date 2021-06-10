import React, { useState, useEffect } from 'react';
import { Form, Select, Button, Input, Upload, Dropdown } from 'antd';
import { useParams, useHistory } from 'react-router-dom';

import { IconDeleteFile } from '../../../components/icons';
import { removeProject, addDocumentToProject, removeDocumentFromProject } from '../../../core/services';
import ProjectFileListItem from '../../../components/ProjectFileListItem';

import iconSelectArrow from '../../../assets/img/iceon-select-arrow.svg';
import iconUpload from '../../../assets/img/icon-upload.svg';
import iconPdf from '../../../assets/img/icon-pdf.svg';
import iconFile from '../../../assets/img/icon-file-s.svg';

import './style.scss';
import reactDomTestUtilsProductionMin from 'react-dom/cjs/react-dom-test-utils.production.min';

const { Option } = Select;
const { Dragger } = Upload;

const Project = ({ form, project, onRemove, isRemoved }) => {
  const [status, setStatus] = useState(null);
  const [isRed, setIsRed] = useState(false);
  const [onRemoveDropdown, setOnRemoveDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const { climeId } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (project.status) setStatus(status);
  }, [project]);

  const customRequest = (e) => {
    const id = form.getFieldsValue().id;
    if (id) {
      addDocumentToProject(climeId, id, e.file).then((data) => {
        form.setFieldsValue({
          documents: data.documents,
        });
      });
    }
    e.onSuccess('ok');
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onDeleteProject = () => {
    const id = form.getFieldsValue().id;
    if (id) {
      setLoading(true);
      removeProject(climeId, id)
        .then((data) => {
          onRemove();
          setIsRed(false);
          setStatus(null);
          history.push(`/project/${climeId}`);
          setOnRemoveDropdown(false);
          form.setFieldsValue({
            challenges: null,
            documents: [],
            id: null,
            objectives: null,
            status: null,
            title: null,
            'start-months': null,
            'start-year': null,
            'end-months': null,
            'end-year': null,
            status: null,
          });
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };

  const onRemoveDocument = (file) => {
    const id = form.getFieldsValue().id;
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
        {/* <h1 style={{ visibility: form.getFieldValue('id') || isRemoved ? 'hidden' : 'visible' }}>New Project</h1> */}
        {isRemoved && (
          <div className="removed-message">
            <img src={iconFile} alt="" />
            <span>There are no projects yet</span>
          </div>
        )}
        <div className={`project__form ${isRemoved ? 'removed' : ''} ${isRed ? 'red' : ''}`}>
          <Dropdown
            placement="bottomRight"
            trigger="click"
            visible={onRemoveDropdown}
            onVisibleChange={(visible) => {
              if (!visible) {
                setOnRemoveDropdown(false);
                setIsRed(false);
              } else {
                setIsRed(true);
              }
            }}
            overlay={
              <div className="step-file--title-dropdown">
                <div className="dropdown-title">Are you sure you want to delete this Document?</div>
                <div className="dropdown-actions">
                  <Button
                    type="button"
                    onClick={(e) => {
                      setOnRemoveDropdown(false);
                      setIsRed(false);
                    }}>
                    Back
                  </Button>
                  <Button type="primary" onClick={onDeleteProject} loading={loading}>
                    Delete
                  </Button>
                </div>
              </div>
            }>
            {/* <button
              className="step-file--remove-button"
              onClick={() => {
                setOnRemoveDropdown(true);
              }}>
              <IconDeleteFile />
            </button> */}
            <button
              type="button"
              className="project__form_remove"
              style={{
                display: !project.id || isRemoved ? 'none' : '',
              }}
              onClick={() => {
                setOnRemoveDropdown(true);
                //onDeleteProject();
              }}>
              <IconDeleteFile />
            </button>
          </Dropdown>
          <div className="project__form_inputs">
            <Form.Item
              label="Project Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Please input your facility title!',
                },
              ]}>
              <Input placeholder="Enter the title" />
            </Form.Item>
          </div>
          <div className="project__form_dates">
            <div className="start-dates">
              <Form.Item
                name="start-months"
                label="Start Date"
                className="row-months"
                rules={[
                  {
                    required: true,
                    message: false,
                  },
                ]}>
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
              <Form.Item
                name="start-year"
                className="row-year"
                rules={[
                  {
                    required: true,
                    message: false,
                  },
                ]}>
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
              <Form.Item
                name="end-months"
                label="End Date"
                className="row-months"
                rules={[
                  {
                    required: true,
                    message: false,
                  },
                ]}>
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
              <Form.Item
                name="end-year"
                className="row-year"
                rules={[
                  {
                    required: true,
                    message: false,
                  },
                ]}>
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
            <Form.Item label="Objectives" name="objectives">
              <Input.TextArea placeholder="Enter objectives" style={{ height: 112 }} />
            </Form.Item>
          </div>
          <div className="project__form_inputs">
            <Form.Item label="Non-Routine Challenges" name="challenges">
              <Input.TextArea placeholder="Enter challenges" style={{ height: 156 }} />
            </Form.Item>
          </div>
          <Form.Item hidden name="id">
            <Input />
          </Form.Item>
        </div>
      </div>
      {!isRemoved && (
        <div className="project__docs">
          <h3>Add Related Documents</h3>
          <Form.Item name="status" className="hidden">
            <Input hidden />
          </Form.Item>
          {project.status && (
            <div className="step-file--status">
              <div className={`status ${statusName(project.status).class}`}>{statusName(project.status).name}</div>
            </div>
          )}
          <div className="project__docs_list">
            <Form.Item name="documents" valuePropName="fileList" getValueFromEvent={normFile} className="documents">
              <Upload
                customRequest={customRequest}
                itemRender={(originNode, file, currFileList) => (
                  <ProjectFileListItem originNode={originNode} file={file} fileList={currFileList} />
                )}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;
