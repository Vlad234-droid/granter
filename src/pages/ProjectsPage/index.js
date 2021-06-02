import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Form, notification, Button, Modal, Skeleton, Upload } from 'antd';

import { getTechnicalClaimStep, setNewProject, editProject, addDocumentToProject } from '../../core/services';
import actions from '../../core/actions';
import { CloseIconModal } from '../../components/icons';
import Project from './Project';

import iconBack from '../../assets/img/arrow-left.svg';
import iconPdf from '../../assets/img/icon-pdf.svg';

import iconDownload from '../../assets/img/icon-download.svg';
import iconUpload from '../../assets/img/icon-upload-blue.svg';
import iconSelectArrow from '../../assets/img/iceon-select-arrow.svg';

import './style.scss';
import DocumentViewer from '../../components/DocumentViewer';

const { Dragger } = Upload;

const ProjectsPage = () => {
  const [currentProject, setCurrentProject] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [formLength, setFormLength] = useState(1);
  const projectsList = useSelector((state) => state.projects.projectsList);
  const { climeId, id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      if (projectsList) {
        setCurrentProject(projectsList.filter((item) => item.id == id)[0]);
      } else {
        const { addProjectsDetails } = bindActionCreators(actions, dispatch);
        getTechnicalClaimStep(climeId).then((data) => {
          addProjectsDetails(data.documents);
          setCurrentProject(data.documents.filter((item) => item.id == id)[0]);
        });
      }
    } else {
      setCurrentProject({});
    }
  }, [id]);

  useEffect(() => {
    if (currentProject) initialValue();
  }, [currentProject]);

  const customRequest = (e) => {
    if (id) {
      addDocumentToProject(climeId, id, e.file, 1).then((data) => {
        setCurrentProject(data);
      });
    } else {
      const form = { main_document: e.file };
      setNewProject(climeId, form).then((data) => {
        setCurrentProject(data);
      });
    }
    e.onSuccess('ok');
  };

  const onFinish = (formValues) => {
    setLoader(true);
    addProject(formValues);
  };

  var getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();

  const addProject = (project) => {
    console.log('FORM', project['start-months']);

    const data = {
      title: project.title,
      objectives: project.objectives,
      challanges: project.challenges,
    };
    console.log(
      'SCOOTEROK',
      project['start-months'],
      project['start-year'],
      project['end-months'],
      project['end-year'],
    );
    if (project['start-months'] >= 0 && project['start-year'] && project['end-months'] >= 0 && project['end-year']) {
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
    console.log('DATA', data);

    if (currentProject.id) {
      editProject(climeId, currentProject.id, data).then(() => {
        notification.success({
          description: 'Project was updated successfully',
        });
        history.push('/active-claims/');
      });
    } else {
      setNewProject(climeId, data).then(() => {
        notification.success({
          description: 'Project was added successfully',
        });
        history.push('/active-claims/');
      });
    }
  };

  const initialValue = () => {
    let result = {};
    if (currentProject) {
      result = {
        challenges: currentProject?.challanges,
        documents: currentProject?.documents,
        id: currentProject?.id,
        objectives: currentProject?.objectives,
        status: currentProject?.status,
        title: currentProject?.title,
      };
    }
    result['start-months'] = currentProject?.start_date
      ? new Date(Number(currentProject?.start_date)).getMonth()
      : null;
    result['start-year'] = currentProject?.start_date
      ? new Date(Number(currentProject?.start_date)).getFullYear()
      : null;
    result['end-months'] = currentProject?.end_date ? new Date(Number(currentProject?.end_date)).getMonth() : null;
    result['end-year'] = currentProject?.end_date ? new Date(Number(currentProject?.end_date)).getFullYear() : null;

    form.setFieldsValue(result);
  };

  const onBack = () => {
    if (!isRemoved && (!currentProject.title?.length || !currentProject.start_date || !currentProject.end_date)) {
      setModalVisible(true);
    } else {
      history.push('/active-claims/');
    }
  };

  return (
    <div className="projects">
      <header>
        <div className="projects__header_wrapper">
          <Button type="link" onClick={onBack} className="header--back">
            <img src={iconBack} alt="" />
            <span>To Dashboard</span>
          </Button>
        </div>
      </header>
      <div className="projects__wrapper">
        <div className="projects-list">
          {!currentProject ? (
            <Skeleton active />
          ) : (
            <Form name="dynamic_form_item" layout="vertical" form={form} requiredMark={false} onFinish={onFinish}>
              <Project
                onRemove={() => {
                  setIsRemoved(true);
                  setCurrentProject({});
                }}
                isRemoved={isRemoved}
                form={form}
                project={currentProject}
              />
              <div className="project__form_submit-external" style={{ marginTop: formLength ? 0 : 56 }}>
                {isRemoved ? (
                  <Button
                    type="primary"
                    onClick={() => {
                      setIsRemoved(false);
                      history.push(`/project/${climeId}`);
                    }}>
                    Add Project
                  </Button>
                ) : (
                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loader}>
                      {id ? 'Save changes' : 'Add Project to Dashboard'}
                    </Button>
                  </Form.Item>
                )}
              </div>
            </Form>
          )}
          {/* <Project /> */}
        </div>
        <div className="projects__viewer">
          {!isRemoved && (
            <div className="projects__viewer_document">
              {!currentProject ? (
                <Skeleton active />
              ) : currentProject.doc_url ? (
                <DocumentViewer url={currentProject.doc_url} />
              ) : (
                <Dragger
                  className="projects__viewer_dragger"
                  customRequest={customRequest}
                  showUploadList={false}
                  accept="application/pdf, application/msword,
              application/vnd.openxmlformats-officedocument.wordprocessingml.document,
              application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
                  <img src={iconPdf} alt="" />
                  <span>There are no documents yet</span>
                </Dragger>
              )}
            </div>
          )}
        </div>
      </div>
      <Modal
        title="Basic Modal"
        className="goback__modal"
        visible={modalVisible}
        width={700}
        onCancel={() => {
          setModalVisible(false);
        }}
        footer={false}
        title={false}
        closeIcon={<CloseIconModal />}>
        <h2>You haven’t filled requested fields</h2>
        <div className="technical__modal_description">
          <p>
            Please, fill them in case you want to keep this project. If you go back to dashboard, the project will be
            deleted.
          </p>
        </div>
        <div className="technical__modal_actions">
          <Button
            type="button"
            onClick={() => {
              setModalVisible(false);
            }}>
            Keep project
          </Button>
          <Button
            type="primary"
            onClick={() => {
              history.push('/active-claims/');
            }}>
            Delete and go to Dashboard
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectsPage;
