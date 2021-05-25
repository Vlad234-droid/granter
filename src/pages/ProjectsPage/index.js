import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Form, notification, Button, Space, Skeleton } from 'antd';

import { getTechnicalClaimStep, setNewProject, editProject } from '../../core/services';
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
  const [count, setCcount] = useState(0);
  const [loader, setLoader] = useState(false);
  const [formLength, setFormLength] = useState(1);
  const projectsList = useSelector((state) => state.projects.projectsList);
  const { climeId, id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();

  useEffect(() => {
    const { addProjectsDetails } = bindActionCreators(actions, dispatch);
    getTechnicalClaimStep(climeId).then((data) => {
      addProjectsDetails(data.documents);
      setCurrentProject(data.documents.filter((item) => item.id == id)[0]);
    });
  }, []);

  useEffect(() => {
    if (count > 0) console.log('Count', count, form.getFieldsValue().projectList?.length);

    if (count > 0 && count === form.getFieldsValue().projectList?.length) {
      notification.success({
        description: 'Project was updated successfully',
      });
      history.push('/active-claims/');
    }
  }, [count]);

  const onFinish = (formValues) => {
    setLoader(true);
    console.log('formValues', formValues);

    if (formValues.projectList.length) {
      formValues.projectList.forEach((item) => {
        addProject(item);
      });
    } else {
      notification.success({
        description: 'Project was updated successfully',
      });
      history.push('/active-claims/');
    }
  };

  var getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();

  const addProject = (project) => {
    const data = {
      title: project.title,
      objectives: project.objectives,
      challanges: project.challenges,
    };
    if (project['start-months'] && project['start-year'] && project['end-months'] && project['end-year']) {
      data.start_date = Date.parse(`${project['start-months'] + 1}/01/${project['start-year']}`);
      data.end_date = Date.parse(
        `${project['end-months'] + 1}/${getDaysInMonth(project['end-months'] + 1, project['end-year'])}/${
          project['end-year']
        }`,
      );
    }
    if (project.documents && !project.id) {
      const docs = [];
      project.documents.forEach((doc) => {
        docs.push(doc.originFileObj);
      });
      data.documents = docs;
    }
    if (project.id) {
      console.log('DATA', data);

      editProject(climeId, project.id, data).then(() => {
        setCcount((prevState) => prevState + 1);
      });
    } else {
      data.project_id = id;
      setNewProject(climeId, data).then(() => {
        setCcount((prevState) => prevState + 1);
      });
    }
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
          status: item.status,
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
    return result;
  };

  const onFieldsChange = () => {
    setFormLength(form.getFieldsValue().projectList.length);
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
          {!currentProject ? (
            <Skeleton active />
          ) : (
            <Form
              name="dynamic_form_item"
              layout="vertical"
              form={form}
              onFinish={onFinish}
              onFieldsChange={onFieldsChange}>
              <Form.List name="projectList" initialValue={initialValue()}>
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field, index) => {
                      return (
                        <Space key={field.key}>
                          <Project field={field} add={add} remove={remove} form={form} length={fields.length} />
                        </Space>
                      );
                    })}

                    <div className="project__form_submit-external" style={{ marginTop: formLength ? 0 : 56 }}>
                      <Button
                        type="button"
                        onClick={() => {
                          add();
                        }}>
                        Add One More Project
                      </Button>
                      <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loader}>
                          {currentProject.projects.length ? 'Save changes' : 'Add Project to Dashboard'}
                        </Button>
                      </Form.Item>
                    </div>
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
