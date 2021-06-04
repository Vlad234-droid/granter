import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tooltip, Skeleton, Drawer } from 'antd';
import { getIntroductionClaimStep, approveIntroduction } from '../../../../core/adminServices/claimServices';
import AdminUploadFile from '../../../../components/AdminUploadFile';
import { IconWarning } from '../../../../components/icons';
import iconCalendar from '../../../../assets/img/icon-calendar.svg';
import arrowLeft from '../../../../assets/img/arrow-left.svg';
import actions from '../../../../core/actions';
import { bindActionCreators } from 'redux';
import CommonModalShadule from '../CommonModalShadule';
import { useParams } from 'react-router-dom';

import './style.scss';

const StepIntroduction = () => {
  const dispatch = useDispatch();
  const [introductionStep, setIntroductionStep] = useState(null);
  const [detailsShow, setDetailsShow] = useState(false);
  const [status, setStatus] = useState(0);
  const [isVisibleModalSheduleCall, setIsVisibleModalSheduleCall] = useState(false);
  const { showBlurSheduleCall, closeBlurSheduleCall } = bindActionCreators(actions, dispatch);
  const { id } = useParams();

  useEffect(() => {
    if (isVisibleModalSheduleCall) {
      showBlurSheduleCall();
    }
    if (!isVisibleModalSheduleCall) {
      closeBlurSheduleCall();
    }
  }, [isVisibleModalSheduleCall]);

  useEffect(() => {
    if (id) {
      setIntroductionStep(null);
      getIntroductionClaimStep(id).then((data) => {
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
  }, [id]);

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
              <div
                className="row admin"
                key={`introduction-document-${item.id}`}
                style={item.red ? { background: 'rgba(246, 87, 71, 0.15)' } : {}}>
                <AdminUploadFile
                  removeButton={true}
                  key={`introduction-document-${item.id}`}
                  file={item}
                  onAction={onAction}
                  onRed={(red) => {
                    //introductionStep, setIntroductionStep
                    const res = { ...introductionStep };
                    res.documents.map((row) => {
                      console.log('row.red', row.red);
                      if (row.id === item.id) row.red = red;
                      return row;
                    });
                    setIntroductionStep(res);
                    //item.red = red;
                  }}
                />
              </div>
            ))}
          </div>
          <div className="step-status">
            {introductionStep.call_date === null && (
              <>
                <button
                  className="step-status--call-schedule"
                  onClick={() => {
                    setIsVisibleModalSheduleCall((prev) => !prev);
                  }}>
                  <img src={iconCalendar} alt="" />
                  <span>Schedule a call</span>
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
        </>
      )}
    </section>
  );
};

export default StepIntroduction;
