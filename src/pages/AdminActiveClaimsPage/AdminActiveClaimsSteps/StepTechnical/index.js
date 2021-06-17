import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Tooltip, Skeleton, Upload, Spin, Modal, Button, Drawer } from 'antd';
import actions from '../../../../core/actions';
import { LoadingOutlined } from '@ant-design/icons';
import { setNewProject, removeProject } from '../../../../core/adminServices';

import { getTechnicalClaimStep, approveStep } from '../../../../core/adminServices/claimServices';

import AdminProject from '../../../../components/AdminProject';
import CommonModalShadule from '../CommonModalShadule';

import iconScheduled from '../../../../assets/img/icon-scheduled.svg';
import iconApproved from '../../../../assets/img/icon-approved.svg';
import { IconWarning, CloseIconModal } from '../../../../components/icons';
import arrowLeft from '../../../../assets/img/arrow-left.svg';
import iconCalendar from '../../../../assets/img/icon-calendar.svg';
import iconFile from '../../../../assets/img/icon-file-b.svg';
import iconAddProject from '../../../../assets/img/icon-add-project.svg';

import './style.scss';

const { Dragger } = Upload;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const StepTechnical = ({ link, activeClaimData, refreshCards }) => {
  const [technicalStep, setTechnicalStep] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [isVisibleModalSheduleCall, setIsVisibleModalSheduleCall] = useState(false);
  const [newProjectId, setNewProjectId] = useState(null);
  const [detailsShow, setDetailsShow] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { blurActiveSteps } = bindActionCreators(actions, dispatch);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setTechnicalStep(null);
      getTechnicalClaimStep(id).then((data) => {
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
        setStatus(status);
      });
    }
  }, [id]);

  const customRequest = (e) => {
    setLoading(true);
    const form = {
      main_document: e.file,
    };
    setNewProject(id, form).then((data) => {
      const { addProjectsDetails } = bindActionCreators(actions, dispatch);
      const res = { ...technicalStep };
      res.documents.push(data);
      addProjectsDetails(res.documents);
      // setTechnicalStep(res);
      setTimeout(() => {
        history.push(`/admin/project/${id}/${data.id}`);
        blurActiveSteps();
      }, 150);
    });
    e.onSuccess('ok');
  };

  const uploadInformation = () => {
    history.push(`/project/${id}/${newProjectId}`);
  };

  const onDelete = (id) => {
    const res = { ...technicalStep };
    res.documents = technicalStep.documents.filter((item) => item.id !== id);
    setTechnicalStep(res);
    const status = res.documents.filter((item) => item.status === 3).length
      ? Math.round((res.documents.filter((item) => item.status === 3).length / res.documents.length) * 100)
      : 0;
    setStatus(status);
    refreshCards(true);
  };

  const onChangeStatus = (project) => {
    const res = { ...technicalStep };
    res.documents = technicalStep.documents.map((item) => {
      if (item.id === project.id) {
        item.status = project.status;
      }
      return item;
    });
    setTechnicalStep(res);
    const status = Math.round((res.documents.filter((item) => item.status === 3).length / res.documents.length) * 100);
    setStatus(status);
    refreshCards(true);
  };

  const checkForAllStatus = () => {
    if (!technicalStep?.documents.filter((item) => item.status !== 3).length) approveStep(id, 3);
  };

  const sheduleCallDate = (date) => {
    const isTodayCheck = (someDate) => {
      const today = new Date();
      someDate = new Date(someDate);
      return (
        someDate.getDate() == today.getDate() &&
        someDate.getMonth() == today.getMonth() &&
        someDate.getFullYear() == today.getFullYear()
      );
    };
    function formatAMPM(someDate) {
      someDate = new Date(someDate);
      var hours = someDate.getHours();
      var minutes = someDate.getMinutes();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }
    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() - 1);
    const isToday = isTodayCheck(date);
    const isTommorow = isTodayCheck(tomorrow);
    const time = formatAMPM(date);

    if (isToday) {
      return `Call today at ${time}`;
    } else if (isTommorow) {
      return `Call tommorow at ${time}`;
    } else {
      const numerDay = new Date(date);
      const month = numerDay.toLocaleString('en-EN', { month: 'short' });
      const day = numerDay.getDate() < 10 ? `0${numerDay.getDate()}` : numerDay.getDate();
      return `Call on ${month} ${day} at ${time}`;
    }
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
                <div
                  className="row admin"
                  key={`introduction-document-${item.id}`}
                  style={item.red ? { background: 'rgba(246, 87, 71, 0.15)' } : {}}>
                  <AdminProject
                    checkForAllStatus={checkForAllStatus}
                    removeButton={true}
                    key={`technical-project-${item.id}`}
                    file={item}
                    onDelete={onDelete}
                    onChangeStatus={onChangeStatus}
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
              ))}
            </div>
            <div className="step-status">
              {!activeClaimData?.call_date_stage3 ? (
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
                    link={link}
                    md={activeClaimData?.call_hash_3}
                    isVisibleModalSheduleCall={isVisibleModalSheduleCall}
                    setIsVisibleModalSheduleCall={setIsVisibleModalSheduleCall}>
                    <ul className="list_shedule_intro">
                      <li>1. Introduction often takes about one hour.</li>
                      <li>
                        2. We want to understand the type of work you have undertaken during the relevant period(s).
                      </li>
                      <li>3. We will help you to gain the maximum value from our innovative client portal.</li>
                    </ul>
                  </CommonModalShadule>
                </>
              ) : new Date().getTime() > activeClaimData?.call_date_stage3 ? (
                <div className="step-status--call-completed">
                  <img src={iconApproved} alt="" />
                  <span>Call is completed</span>
                </div>
              ) : (
                <div className="step-status--call-reminder">
                  <div className="reminder-title">
                    <img src={iconScheduled} alt="" />
                    <span>{sheduleCallDate(activeClaimData?.call_date_stage3)}</span>
                  </div>
                  <div className="reminder-description">Check email for details</div>
                </div>
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
                  <span className="step-status--bar-fill" style={{ width: (status ? status : 0) + '%' }} />
                  <span className="step-status--bar-parcent">{status ? status : 0}%</span>
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
            Alternatively, you can upload <br />a pdf, word or xlsx document for your consultant to review.
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
              history.push(`/admin/project/${id}`);
              setModalVisible(false);
              blurActiveSteps();
            }}>
            Add your First Project
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default StepTechnical;
