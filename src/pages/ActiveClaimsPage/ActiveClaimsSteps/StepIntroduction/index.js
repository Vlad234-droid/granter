import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tooltip, Skeleton, Drawer } from 'antd';
import { getIntroductionClaimStep } from '../../../../core/services';
import UploadFile from '../../../../components/UploadFile';
import { IconWarning } from '../../../../components/icons';
import iconCalendar from '../../../../assets/img/icon-calendar.svg';
import arrowLeft from '../../../../assets/img/arrow-left.svg';
import actions from '../../../../core/actions';
import { bindActionCreators } from 'redux';
import CommonModalShadule from '../CommonModalShadule';

import './style.scss';

const StepIntroduction = () => {
  const dispatch = useDispatch();
  const [introductionStep, setIntroductionStep] = useState(null);
  const [detailsShow, setDetailsShow] = useState(false);
  const [status, setStatus] = useState(0);
  const activeClaimId = useSelector((state) => state.user.activeClaimId);
  const [isVisibleModalSheduleCall, setIsVisibleModalSheduleCall] = useState(false);
  const { showBlurSheduleCall, closeBlurSheduleCall, blurActiveSteps } = bindActionCreators(actions, dispatch);

  useEffect(() => {
    if (isVisibleModalSheduleCall) {
      showBlurSheduleCall();
    }
    if (!isVisibleModalSheduleCall) {
      closeBlurSheduleCall();
    }
  }, [isVisibleModalSheduleCall]);

  useEffect(() => {
    if (activeClaimId) {
      setIntroductionStep(null);
      getIntroductionClaimStep(activeClaimId).then((data) => {
        const res = { ...data };
        res.documents = data.documents.map((item) => {
          item.red = false;
          return item;
        });
        setIntroductionStep(res);
        const status = Math.round(
          (res.documents.filter((item) => item.status === 3).length / res.documents.length) * 100,
        );
        setStatus(status);
      });
    }
  }, [activeClaimId]);

  const onAction = (file) => {
    const res = { ...introductionStep };
    res.documents = introductionStep.documents.map((item) => {
      if (item.id === file.id) item = file;
      return item;
    });
    setIntroductionStep(res);
    const status = Math.round((res.documents.filter((item) => item.status === 3).length / res.documents.length) * 100);
    setStatus(status);
  };

  return (
    <section className="active-claims__steps_step introduction">
      <h2
        onClick={() => {
          setDetailsShow(true);
          blurActiveSteps();
        }}>
        <p>
          1<i>/</i>5 Introduction
        </p>
        <Tooltip title="Required Files">
          <span>
            <IconWarning />
          </span>
        </Tooltip>
      </h2>
      {!introductionStep ? (
        <Skeleton active />
      ) : (
        <>
          <div className="step-actions">
            {introductionStep.documents.map((item) => (
              <UploadFile key={`introduction-document-${item.id}`} file={item} onAction={onAction} />
            ))}
          </div>
          <div className="step-status">
            {introductionStep.call_date === null && (
              <>
                <button
                  className={`step-status--call-schedule ${
                    introductionStep.documents.filter((item) => item.status === 1).length === 3 ? 'disabled' : ''
                  }`}
                  onClick={() => {
                    if (introductionStep.documents.filter((item) => item.status === 1).length === 3) return;
                    setIsVisibleModalSheduleCall((prev) => !prev);
                  }}>
                  <img src={iconCalendar} alt="" />
                  <span>Schedule a call</span>
                  {introductionStep.documents.filter((item) => item.status === 1).length === 3 && (
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
                  1<i>/</i>5 Introduction
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
            <div className="step-actions">
              {introductionStep.documents.map((item) => {
                return (
                  <div
                    className="row"
                    key={`introduction-document-${item.id}`}
                    style={item.red ? { background: 'rgba(246, 87, 71, 0.15)' } : {}}>
                    <UploadFile
                      file={item}
                      removeButton={true}
                      onAction={onAction}
                      onRed={(red) => {
                        //introductionStep, setIntroductionStep
                        const res = { ...introductionStep };
                        res.documents.map((row) => {
                          if (row.id === item.id) row.red = red;
                          return row;
                        });
                        setIntroductionStep(res);
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
      )}
    </section>
  );
};

export default StepIntroduction;
