import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Tooltip, Skeleton, Upload, Spin, Modal, Button, Drawer } from 'antd';
import actions from '../../../../core/actions';
import { LoadingOutlined } from '@ant-design/icons';
import { setNewProject, removeProject } from '../../../../core/services';
import { getTechnicalClaimStep } from '../../../../core/adminServices/claimServices';
import Project from '../../../../components/Project';
import { IconWarning, CloseIconModal } from '../../../../components/icons';
import iconUploadRed from '../../../../assets/img/icon-upload-red.svg';
import iconUpload from '../../../../assets/img/icon-upload.svg';
import arrowLeft from '../../../../assets/img/arrow-left.svg';
import iconCalendar from '../../../../assets/img/icon-calendar.svg';
import iconApproved from '../../../../assets/img/icon-approved.svg';
import iconPdf from '../../../../assets/img/icon-pdf.svg';
import './style.scss';
import { useParams } from 'react-router-dom';

const { Dragger } = Upload;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const StepTechnical = () => {
  const [technicalStep, setTechnicalStep] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [newProjectId, setNewProjectId] = useState(null);
  const [detailsShow, setDetailsShow] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { showBlurActiveTechnicals, closeBlurActiveTechnicals } = bindActionCreators(actions, dispatch);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setTechnicalStep(null);
      getTechnicalClaimStep(id).then((data) => {
        const claim = { ...data };

        const result = data.documents.map((item) => {
          if (item.title === '' || !item.start_date || !item.end_date) {
            removeProject(item.claim_id, item.id);
          } else {
            return item;
          }
        });
        claim.documents = result;
        setTechnicalStep(claim);
        const { addProjectsDetails } = bindActionCreators(actions, dispatch);
        addProjectsDetails(claim.documents);
      });
    }
  }, [id]);

  const customRequest = (e) => {
    setLoading(true);
    const form = {
      documents: [e.file],
    };
    setNewProject(id, form).then((data) => {
      history.push(`/project/${id}/${data.id}`);
    });
    e.onSuccess('ok');
  };

  const uploadInformation = () => {
    history.push(`/project/${id}/${newProjectId}`);
    closeBlurActiveTechnicals();
  };

  const onAction = (id) => {
    const res = { ...technicalStep };
    res.documents = technicalStep.documents.filter((item) => item.id !== id);
    setTechnicalStep(res);
    const status = Math.round((res.documents.filter((item) => item.status === 3).length / res.documents.length) * 100);
    setStatus(status);
  };

  return (
    <>
      <section className="active-claims__steps_step technical">
        <h2
          onClick={() => {
            setDetailsShow(true);
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
              {technicalStep.documents.map((item, index) => (
                <div
                  className="row"
                  key={`technical-project-${item.id}`}
                  style={item.red ? { background: 'rgba(246, 87, 71, 0.15)' } : {}}>
                  <Project
                    key={`technical-project-${item.id}`}
                    file={item}
                    index={technicalStep.documents.length > 1 ? index + 1 : null}
                    removeButton={true}
                    onRed={(red) => {
                      const res = { ...technicalStep };
                      res.documents.map((row) => {
                        if (row.id === item.id) row.red = red;
                        return row;
                      });
                      setTechnicalStep(res);
                    }}
                  />
                </div>
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
          closeBlurActiveTechnicals();
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
          <Button
            type="button"
            onClick={() => {
              setModalVisible(false);
              closeBlurActiveTechnicals();
            }}>
            Add your First Project
          </Button>
          <Button type="primary" onClick={uploadInformation}>
            Upload Information
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default StepTechnical;
