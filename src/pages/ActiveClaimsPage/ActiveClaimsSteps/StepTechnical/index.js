import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Tooltip, Skeleton, Upload, Spin, Modal, Button } from 'antd';
import actions from '../../../../core/actions';

import { LoadingOutlined } from '@ant-design/icons';

import { getTechnicalClaimStep, setNewProject } from '../../../../core/services';

import Project from '../../../../components/Project';
import { IconWarning, CloseIconModal } from '../../../../components/icons';

import iconUploadRed from '../../../../assets/img/icon-upload-red.svg';
import iconUpload from '../../../../assets/img/icon-upload.svg';
import iconCalendar from '../../../../assets/img/icon-calendar.svg';
import iconPdf from '../../../../assets/img/icon-pdf.svg';

import './style.scss';

const { Dragger } = Upload;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const StepTechnical = () => {
  const [technicalStep, setTechnicalStep] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const activeClaimId = useSelector((state) => state.user.activeClaimId);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (activeClaimId) {
      setTechnicalStep(null);
      getTechnicalClaimStep(activeClaimId).then((data) => {
        setTechnicalStep(data);
        const { addProjectsDetails } = bindActionCreators(actions, dispatch);
        addProjectsDetails(data.documents);
        console.log('getTechnicalClaimStep', data);
      });
    }
  }, [activeClaimId]);

  const customRequest = (e) => {
    setLoading(true);
    const form = {
      documents: [e.file],
    };
    setNewProject(activeClaimId, form).then((data) => {
      setLoading(false);
      console.log(data);
    });
    e.onSuccess('ok');
  };

  return (
    <>
      <section className="active-claims__steps_step technical">
        <h2>
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
          <>
            <div className="step-actions">
              <Dragger
                name="file"
                customRequest={customRequest}
                accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                className={`upload-file ${loading ? 'loading' : ''}`}
                showUploadList={false}>
                <div className="upload-loading">
                  <Spin indicator={antIcon} />
                </div>
                <div className="upload-title">
                  <img src={iconUpload} alt="" />
                  <span>Add a Project</span>
                </div>

                <div className="upload-status">
                  <img src={iconUploadRed} alt="" />
                  <span>Not uploaded</span>
                </div>
              </Dragger>

              {technicalStep.documents.map((item) => (
                <Project key={`technical-project-${item.id}`} file={item} />
              ))}
            </div>
            <div className="step-status">
              {technicalStep.call_date === null && (
                <button className="step-status--call-schedule">
                  <img src={iconCalendar} alt="" />
                  <span>Schedule a call</span>
                </button>
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

              <div className="step-status--bar waiting">
                <span className="step-status--bar-fill" style={{ width: '0%' }} />
                <span className="step-status--bar-parcent">0%</span>
                <span className="step-status--bar-detail">Waiting</span>
              </div>
            </div>
          </>
        )}
      </section>

      <Modal
        title="Basic Modal"
        className="technical__modal"
        visible={modalVisible}
        width={700}
        onCancel={() => {
          setModalVisible(false);
        }}
        footer={false}
        title={false}
        closeIcon={<CloseIconModal />}>
        <h2>You uploaded List of pojects</h2>
        <div className="technical__modal_file">
          <img src={iconPdf} alt="file" />
          <span>List of projects</span>
        </div>
        <div className="technical__modal_description">
          <p>Upload project information using our online project information tool. </p>
          <p>
            Alternatively, if you have existing information, please click below to upload a pdf or word document for
            your consultant to review.
          </p>
        </div>
        <div className="technical__modal_actions">
          <Button type="button">Add your First Project</Button>
          <Button type="primary">Upload Information</Button>
        </div>
      </Modal>
    </>
  );
};

export default StepTechnical;
