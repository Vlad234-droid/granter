import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Form, Select, Button, Space, Skeleton } from 'antd';

import { getTechnicalClaimStep, setNewProject } from '../../core/services';
import actions from '../../core/actions';
import { IconComment } from '../../components/icons';
import Project from './Project';

import iconBack from '../../assets/img/arrow-left.svg';
import iconDownload from '../../assets/img/icon-download.svg';
import iconUpload from '../../assets/img/icon-upload-blue.svg';
import iconSelectArrow from '../../assets/img/iceon-select-arrow.svg';

import './style.scss';
import DocumentViewer from '../../components/DocumentViewer';

const ProjectsPage = () => {
  const [currentProject, setCurrentProject] = useState(null);
  const projectsList = useSelector((state) => state.projects.projectsList);
  const { climeId, id } = useParams();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (!projectsList) {
      const { addProjectsDetails } = bindActionCreators(actions, dispatch);
      getTechnicalClaimStep(climeId).then((data) => {
        addProjectsDetails(data.documents);
        setCurrentProject(data.documents.filter((item) => item.id == id)[0]);
      });
    } else {
      setCurrentProject(projectsList.filter((item) => item.id == id)[0]);
    }
  }, [projectsList]);

  const onFinish = (formValues) => {
    formValues.projectList.forEach((item) => {
      addProject(item);
    });
  };

  const addProject = (project) => {
    const form = {
      title: project.title,
      project_id: id,
      objectives: project.objectives,
      challanges: project.challenges,
    };
    if (project['start-months'] && project['start-year'] && project['end-months'] && project['end-year']) {
      form.start_date = Date.parse(`${project['start-months']}/01/${project['start-year']}`);
      form.end_date = Date.parse(`${project['end-months']}/01/${project['end-year']}`);
    }
    if (project.documents) {
      const docs = [];
      project.documents.forEach((doc) => {
        docs.push(doc.originFileObj);
      });
      form.documents = docs;
    }
    if (project.id) {
    } else {
      setNewProject(climeId, form);
    }
    console.log(form);
  };

  const initialValue = () => {
    const result = [];
    if (currentProject.projects.length) {
      currentProject.projects.forEach((item) => {
        const project = {
          title: item.title,
          challenges: item.challanges,
          id: item.id,
          objectives: item.objectives,
          documents: item.documents,
        };
        if (item.start_date && item.end_date) {
          project['start-months'] = new Date(Number(item.start_date)).getMonth();
          project['start-year'] = new Date(Number(item.start_date)).getFullYear();
          project['end-months'] = new Date(Number(item.end_date)).getMonth();
          project['end-year'] = new Date(Number(item.end_date)).getFullYear();
        }
        result.push(project);
      });
    } else {
      result.push({
        title: undefined,
        challenges: undefined,
        'end-months': undefined,
        'end-year': undefined,
        id: undefined,
        objectives: undefined,
        'start-months': undefined,
        'start-year': undefined,
      });
    }
    console.log('initialValue', currentProject);
    return result;
  };

  // const onFieldsChange = (changedFields, allFields) => {
  //   console.log(form.getFieldsValue());
  // };

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
          {!currentProject ? (
            <Skeleton active />
          ) : (
            <Form
              name="dynamic_form_item"
              layout="vertical"
              form={form}
              onFinish={onFinish}
              // onFieldsChange={onFieldsChange}
            >
              <Form.List name="projectList" initialValue={initialValue()}>
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field, index) => {
                      console.log(field);
                      return (
                        <Space key={field.key}>
                          <Project field={field} add={add} remove={remove} form={form} length={fields.length} />
                        </Space>
                      );
                    })}
                    {fields.length > 1 && (
                      <div className="project__form_submit-external">
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
                      </div>
                    )}
                  </>
                )}
              </Form.List>
            </Form>
          )}
          {/* <Project /> */}
        </div>
        <div className="projects__viewer">
          <div className="projects__viewer_document">
            {!currentProject ? <Skeleton active /> : <DocumentViewer url={currentProject.documents[0].url} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
