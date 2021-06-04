import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Skeleton, Drawer } from 'antd';
import { getFinancialClaimStep } from '../../../../core/adminServices/claimServices';
import AdminUploadFile from '../../../../components/AdminUploadFile';
import iconCalendar from '../../../../assets/img/icon-calendar.svg';
import arrowLeft from '../../../../assets/img/arrow-left.svg';
import actions from '../../../../core/actions';
import { bindActionCreators } from 'redux';
import CommonModalShadule from '../CommonModalShadule';
import { useParams } from 'react-router-dom';

import './style.scss';

const StepFinancial = () => {
  const dispatch = useDispatch();
  const [financialStep, setFinancialStep] = useState(null);
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
      setFinancialStep(null);
      getFinancialClaimStep(id)
        .then((data) => {
          const res = { ...data };
          res.documents = data.documents.map((item) => {
            item.red = false;
            return item;
          });
          setFinancialStep(res);
          const status = Math.round(
            (res.documents.filter((item) => item.status === 3).length / res.documents.length) * 100,
          );
          setStatus(status);
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  }, [id]);

  const onAction = (file) => {
    console.log(file);
    const res = { ...financialStep };
    res.documents = financialStep.documents.map((item) => {
      if (item.id === file.id) item = file;
      return item;
    });
    setFinancialStep(res);
    console.log(res);
    const status = Math.round((res.documents.filter((item) => item.status === 3).length / res.documents.length) * 100);
    setStatus(status);
  };

  return (
    <section className="active-claims__steps_step financial">
      <h2
        onClick={() => {
          setDetailsShow(true);
        }}>
        2<i>/</i>5 Financial
      </h2>

      {!financialStep ? (
        <Skeleton active />
      ) : (
        <>
          <div className="step-actions">
            {financialStep.documents.map((item) => (
              <div
                className="row"
                key={`introduction-document-${item.id}`}
                style={item.red ? { background: 'rgba(246, 87, 71, 0.15)' } : {}}>
                <AdminUploadFile
                  key={`introduction-document-${item.id}`}
                  file={item}
                  skipButton={true}
                  onAction={onAction}
                  removeButton={true}
                  onRed={(red) => {
                    const res = { ...financialStep };
                    res.documents.map((row) => {
                      if (row.id === item.id) row.red = red;
                      return row;
                    });
                    setFinancialStep(res);
                  }}
                />
              </div>
            ))}
          </div>
          <div className="step-status">
            {financialStep.call_date === null && (
              <>
                <button
                  className="step-status--call-schedule"
                  onClick={() => {
                    setIsVisibleModalSheduleCall((prev) => !prev);
                  }}>
                  <img src={iconCalendar} alt="iconCalendar" />
                  <span>Schedule a call</span>
                </button>
                <CommonModalShadule
                  isVisibleModalSheduleCall={isVisibleModalSheduleCall}
                  setIsVisibleModalSheduleCall={setIsVisibleModalSheduleCall}>
                  <ul className="list_shedule_intro">
                    <li>1. Financial call often takes about 1 hour.</li>
                    <li>
                      2. We want to assist you in accurately analysing project expenditure that occurred within the
                      relevant period(s).
                    </li>
                    <li>
                      3. We will do our due diligence and benchmark your claim in order to maximise the robustness of
                      submission.
                    </li>
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

export default StepFinancial;
