import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Skeleton, Drawer, Tooltip } from 'antd';
import { IconWarning } from '../../../../components/icons';
import { getFinancialClaimStep } from '../../../../core/services';
import UploadFile from '../../../../components/UploadFile';
import iconCalendar from '../../../../assets/img/icon-calendar.svg';
import arrowLeft from '../../../../assets/img/arrow-left.svg';
import actions from '../../../../core/actions';
import { bindActionCreators } from 'redux';
import CommonModalShadule from '../CommonModalShadule';

import './style.scss';

const StepFinancial = () => {
  const dispatch = useDispatch();
  const [financialStep, setFinancialStep] = useState(null);
  const [detailsShow, setDetailsShow] = useState(false);
  const [status, setStatus] = useState(0);
  const activeClaimId = useSelector((state) => state.user.activeClaimId);
  const [isVisibleModalSheduleCall, setIsVisibleModalSheduleCall] = useState(false);
  const { showBlurSheduleCall, closeBlurSheduleCall } = bindActionCreators(actions, dispatch);

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
      setFinancialStep(null);
      getFinancialClaimStep(activeClaimId)
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
  }, [activeClaimId]);

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
              <UploadFile key={`introduction-document-${item.id}`} file={item} skipButton={true} onAction={onAction} />
            ))}
          </div>
          <div className="step-status">
            {financialStep.call_date === null && (
              <>
                <button
                  className={`step-status--call-schedule ${
                    financialStep.documents.filter((item) => item.status === 1).length === 4 ? 'disabled' : ''
                  }`}
                  onClick={() => {
                    if (financialStep.documents.filter((item) => item.status === 1).length === 4) return;
                    setIsVisibleModalSheduleCall((prev) => !prev);
                  }}>
                  <img src={iconCalendar} alt="" />
                  <span>Schedule a call</span>
                  {financialStep.documents.filter((item) => item.status === 1).length === 4 && (
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
                <img src={arrowLeft} />
                <p>
                  2<i>/</i>5 Financial
                </p>
              </div>
            }
            placement="right"
            width="320px"
            closable={false}
            onClose={() => {
              setDetailsShow(false);
            }}
            visible={detailsShow}
            className="active-claims__step_drawer">
            <div className="step-actions">
              {financialStep.documents.map((item) => {
                return (
                  <div
                    className="row"
                    key={`introduction-document-${item.id}`}
                    style={item.red ? { background: 'rgba(246, 87, 71, 0.15)' } : {}}>
                    <UploadFile
                      file={item}
                      removeButton={true}
                      skipButton={true}
                      onAction={onAction}
                      onRed={(red) => {
                        //introductionStep, setIntroductionStep
                        const res = { ...financialStep };
                        res.documents.map((row) => {
                          if (row.id === item.id) row.red = red;
                          return row;
                        });
                        setFinancialStep(res);
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

export default StepFinancial;
