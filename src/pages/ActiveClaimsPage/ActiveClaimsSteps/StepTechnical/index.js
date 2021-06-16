import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Tooltip, Skeleton, Upload, Spin, Modal, Button, Drawer } from 'antd';
import actions from '../../../../core/actions';
import { LoadingOutlined } from '@ant-design/icons';
import { getTechnicalClaimStep, setNewProject, removeProject } from '../../../../core/services';
import Project from '../../../../components/Project';
import CommonModalShadule from '../CommonModalShadule';
import { IconWarning, CloseIconModal } from '../../../../components/icons';
import arrowLeft from '../../../../assets/img/arrow-left.svg';
import iconCalendar from '../../../../assets/img/icon-calendar.svg';
import iconFile from '../../../../assets/img/icon-file-b.svg';
import iconAddProject from '../../../../assets/img/icon-add-project.svg';
import md5 from 'md5';

import './style.scss';

const { Dragger } = Upload;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const StepTechnical = () => {
  const [technicalStep, setTechnicalStep] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [isVisibleModalSheduleCall, setIsVisibleModalSheduleCall] = useState(false);
  const [newProjectId, setNewProjectId] = useState(null);
  const [detailsShow, setDetailsShow] = useState(false);
  const { activeClaimId } = useSelector((state) => state.user);
  const { id } = useSelector((state) => state.user?.data);
  const dispatch = useDispatch();
  const history = useHistory();
  const [md, setMd] = useState('');
  const { blurActiveSteps, setStepStatus } = bindActionCreators(actions, dispatch);

  useEffect(() => {
    if (activeClaimId && id) {
      setMd(() => md5(id, activeClaimId, 3));
    }
  }, [activeClaimId, id]);

  useEffect(() => {
    if (activeClaimId) {
      setTechnicalStep(null);
      getTechnicalClaimStep(activeClaimId).then((data) => {
        const result = { ...data };
        result.documents = data.documents.filter((item) => item.title.length && item.start_date && item.end_date);
        data.documents.forEach((item) => {
          if (item.title === '' || !item.start_date || !item.end_date) {
            removeProject(item.claim_id, item.id);
          }
        });
        setTechnicalStep(result);
        const { addProjectsDetails } = bindActionCreators(actions, dispatch);
        addProjectsDetails(result.documents);
        const status = Math.round(
          (data.documents.filter((item) => item.status === 3).length / data.documents.length) * 100,
        );
        if (status === 100) {
          setStepStatus({
            name: 'technical',
            status: true,
          });
        }
        setStatus(status);
      });
    }
  }, [activeClaimId]);

  const customRequest = (e) => {
    setLoading(true);
    const form = {
      main_document: e.file,
    };
    setNewProject(activeClaimId, form).then((data) => {
      // setLoading(false);
      // setModalVisible(true);
      // setNewProjectId(data.id);
      const { addProjectsDetails } = bindActionCreators(actions, dispatch);
      const res = { ...technicalStep };
      res.documents.push(data);
      addProjectsDetails(res.documents);
      // setTechnicalStep(res);
      setTimeout(() => {
        history.push(`/project/${activeClaimId}/${data.id}`);
        blurActiveSteps();
      }, 150);
    });
    e.onSuccess('ok');
  };

  const uploadInformation = () => {
    history.push(`/project/${activeClaimId}/${newProjectId}`);
  };

  const onAction = (id) => {
    const res = { ...technicalStep };
    res.documents = technicalStep.documents.filter((item) => item.id !== id);
    setTechnicalStep(res);
    const status = res.documents.filter((item) => item.status === 3).length
      ? Math.round((res.documents.filter((item) => item.status === 3).length / res.documents.length) * 100)
      : 0;
    setStatus(status);
  };

  return (
    <>
      <section className="active-claims__steps_step technical">
        <h2
          onClick={() => {
            setDetailsShow(true);
            blurActiveSteps();
          }}>
          <p>
            3<i>/</i>5 Technical
          </p>
          <Tooltip title="Required Files">
            <span>
              <IconWarning />
            </span>
          </Tooltip>
        </h2>
        {!technicalStep ? (
          <Skeleton active />
        ) : (
          <div className="technical__scroll">
            <div className="step-actions">
              <button
                className="technical__add-project_button"
                onClick={() => {
                  setModalVisible(true);
                  blurActiveSteps();
                }}>
                <img src={iconAddProject} alt="" />
                <span>Add a Project</span>
              </button>
              {/* <Dragger
                name="file"
                customRequest={customRequest}
                accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                className={`upload-file ${loading ? 'loading' : ''}`}
                showUploadList={false}>
                <div className="upload-loading">
                  <Spin indicator={antIcon} />
                </div>
                <div className="upload-title">
                  <img src={iconAddProject} alt="" />
                  <span>Add a Project</span>
                </div>
              </Dragger> */}
              {technicalStep.documents.map((item, index) => (
                <Project
                  key={`technical-project-${item.id}`}
                  file={item}
                  index={technicalStep.documents.length > 1 ? index + 1 : null}
                />
              ))}
            </div>
            <div className="step-status">
              {technicalStep.call_date === null && (
                <>
                  <button
                    className={`step-status--call-schedule ${technicalStep.documents.length === 0 ? 'disabled' : ''}`}
                    onClick={() => {
                      if (technicalStep.documents.length === 0) return;
                      setIsVisibleModalSheduleCall((prev) => !prev);
                    }}>
                    <img src={iconCalendar} alt="" />
                    <span>Schedule a call</span>
                    {technicalStep.documents.length === 0 && (
                      <Tooltip
                        title="Please, upload documents 
                      to be able to schedule this call. 
                      Or contact our support">
                        <span className="warning">
                          <IconWarning />
                        </span>
                      </Tooltip>
                    )}
                  </button>
                  <CommonModalShadule
                    md={md}
                    isVisibleModalSheduleCall={isVisibleModalSheduleCall}
                    setIsVisibleModalSheduleCall={setIsVisibleModalSheduleCall}>
                    <ul className="list_shedule_intro">
                      <li>1. Technical call often takes about one hour.</li>
                      <li>
                        2. We want to understand the detail behind the type of work you have undertaken during the
                        relevant period(s).
                      </li>
                      <li>3. We can also briefly discuss the financial process</li>
                    </ul>
                  </CommonModalShadule>
                </>
              )}
              {/* <div className='step-status--call-reminder'>
              <div className='reminder-title'>
                <img src={iconScheduled} alt='' />
                <span>Call today at 8:00PM</span>
              </div>
              <div className='reminder-description'>
                Check email for details
              </div>
            </div>

            <div className='step-status--call-completed'>
              <img src={iconApproved} alt='' />
              <span>Call is completed</span>
            </div> */}

              <div className="step-status">
                <div className={`step-status--bar ${status === 100 ? 'done' : status > 0 ? 'process' : 'waiting'}`}>
                  <span className="step-status--bar-fill" style={{ width: status + '%' }} />
                  <span className="step-status--bar-parcent">{status}%</span>
                  <span className="step-status--bar-detail">
                    {status === 100 ? 'Finished' : status > 0 ? 'In Progress' : 'Waiting'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <Modal
        title="Basic Modal"
        className="technical__modal"
        visible={modalVisible}
        width={700}
        onCancel={() => {
          setModalVisible(false);
          blurActiveSteps();
        }}
        footer={false}
        title={false}
        closeIcon={<CloseIconModal />}>
        <h2>Create your first project</h2>
        <div className="technical__modal_description">
          <p>Upload project information using our online tool. </p>
          <p>
            Alternatively, you can upload <br />a pdf or word document for your consultant to review.
          </p>
        </div>
        <div className="technical__modal_actions">
          <Dragger
            name="file"
            customRequest={customRequest}
            accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            className={`upload-file ${loading ? 'loading' : ''}`}
            showUploadList={false}>
            <Button type="button" loading={loading}>
              <img src={iconFile} alt="" />
              <span>Add file</span>
            </Button>
          </Dragger>
          <Button
            type="primary"
            onClick={() => {
              history.push(`/project/${activeClaimId}`);
              setModalVisible(false);
              blurActiveSteps();
            }}>
            Add your First Project
          </Button>
        </div>
      </Modal>

      <Drawer
        title={
          <div className="ant-drawer-title-wripper">
            <img
              src={arrowLeft}
              alt={arrowLeft}
              onClick={() => {
                setDetailsShow(() => false);
                blurActiveSteps();
              }}
            />
            <p>
              3<i>/</i>5 Technical
            </p>
            <Tooltip title="Required Files" placement="left">
              <span>
                <IconWarning />
              </span>
            </Tooltip>
          </div>
        }
        placement="right"
        width="320px"
        closable={false}
        onClose={() => {
          setDetailsShow(false);
          blurActiveSteps();
        }}
        visible={detailsShow}
        className="active-claims__step_drawer">
        <div className="drawer-technical-dragger">
          <button>
            <div className="upload-title">
              <img src={iconAddProject} alt="" />
              <span>Add a Project</span>
            </div>
          </button>
          {/* <Dragger
            name="file"
            customRequest={customRequest}
            accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            className={`upload-file ${loading ? 'loading' : ''}`}
            showUploadList={false}>
            <div className="upload-loading">
              <Spin indicator={antIcon} />
            </div>
          </Dragger> */}
        </div>
        <div className="step-actions">
          {technicalStep?.documents.map((item, index) => {
            return (
              <div
                className="row"
                key={`introduction-document-${item.id}`}
                style={item.red ? { background: 'rgba(246, 87, 71, 0.15)' } : {}}>
                <Project
                  file={item}
                  removeButton={true}
                  onAction={onAction}
                  index={technicalStep.documents.length > 1 ? index + 1 : null}
                  onRed={(red) => {
                    //introductionStep, setIntroductionStep
                    const res = { ...technicalStep };
                    res.documents.map((row) => {
                      if (row.id === item.id) row.red = red;
                      return row;
                    });
                    setTechnicalStep(res);
                    //item.red = red;
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="step-status">
          <div className={`step-status--bar ${status === 100 ? 'done' : status > 0 ? 'process' : 'waiting'}`}>
            <span className="step-status--bar-fill" style={{ width: status + '%' }} />
            <span className="step-status--bar-parcent">{status}%</span>
            <span className="step-status--bar-detail">
              {status === 100 ? 'Finished' : status > 0 ? 'In Progress' : 'Waiting'}
            </span>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default StepTechnical;
