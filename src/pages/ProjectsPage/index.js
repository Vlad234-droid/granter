import React from 'react';
import { Link } from 'react-router-dom';

import { Form, Select, Button, Space } from 'antd';

import { IconComment } from '../../components/icons';
import Project from './Project';

import iconBack from '../../assets/img/arrow-left.svg';
import iconDownload from '../../assets/img/icon-download.svg';
import iconUpload from '../../assets/img/icon-upload-blue.svg';
import iconSelectArrow from '../../assets/img/iceon-select-arrow.svg';

import './style.scss';
import DocumentViewer from '../../components/DocumentViewer';

const ProjectsPage = () => {
  const onFinish = (valuse) => {
    console.log(valuse);
  };

  return (
    <div className="projects">
      <header>
        <div className="projects__header_wrapper">
          <Link to="/active-claims/" className="header--back">
            <img src={iconBack} alt="" />
            <span>To Dashboard</span>
          </Link>
        </div>
      </header>
      <div className="projects__wrapper">
        <div className="projects-list">
          <Form name="dynamic_form_item" layout="vertical" onFinish={onFinish}>
            <Form.List
              name="projectList"
              initialValue={[
                {
                  username: 'scooterok',
                },
              ]}>
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => {
                    console.log(field);
                    return (
                      <Space key={field.key}>
                        {/* <Form.Item {...field} noStyle name={[field.name, 'title']}>
                          <Input placeholder="passenger name" style={{ width: '60%' }} />
                        </Form.Item>
                        <Form.Item {...field} noStyle name={[field.name, 'start']}>
                          <Input placeholder="passenger name" style={{ width: '60%' }} />
                        </Form.Item>
                        {fields.length > 1 ? (
                          <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} />
                        ) : null} */}
                        <Project field={field} add={add} remove={remove} />
                      </Space>
                    );
                  })}
                  {/* <Form.Item>
                    <Button type="dashed" onClick={() => add()} style={{ width: '60%' }}>
                      Add field
                    </Button>
                  </Form.Item> */}
                </>
              )}
            </Form.List>
            {/* <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item> */}
          </Form>
          {/* <Project /> */}
        </div>
        <div className="projects__viewer">
          <div className="projects__viewer_document">
            <DocumentViewer url="https://file-examples-com.github.io/uploads/2017/02/file-sample_500kB.docx" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
