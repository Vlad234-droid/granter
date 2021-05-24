import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tooltip, Skeleton } from 'antd';
import { getTechnicalClaimStep } from '../../../../core/services';
import UploadFile from '../../../../components/UploadFile';
import { IconWarning } from '../../../../components/icons';
import iconCalendar from '../../../../assets/img/icon-calendar.svg';
import actions from '../../../../core/actions';
import { bindActionCreators } from 'redux';
import CommonModalShadule from '../CommonModalShadule';

import './style.scss';

const StepTechnical = () => {
  const dispatch = useDispatch();
  const [technicalStep, setTechnicalStep] = useState(null);
  const activeClaimId = useSelector((state) => state.user.activeClaimId);
  const { showBlurSheduleCall, closeBlurSheduleCall } = bindActionCreators(actions, dispatch);
  const [isVisibleModalSheduleCall, setIsVisibleModalSheduleCall] = useState(false);

  useEffect(() => {
    if (activeClaimId) {
      setTechnicalStep(null);
      getTechnicalClaimStep(activeClaimId).then((data) => {
        setTechnicalStep(data);
        console.log('getTechnicalClaimStep', data);
      });
    }
  }, [activeClaimId]);

  useEffect(() => {
    if (isVisibleModalSheduleCall) {
      showBlurSheduleCall();
    }
    if (!isVisibleModalSheduleCall) {
      closeBlurSheduleCall();
    }
  }, [isVisibleModalSheduleCall]);

  return (
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
            {technicalStep.documents.map((item) => (
              <UploadFile key={`introduction-document-${item.id}`} file={item} />
            ))}
          </div>
          <div className="step-status">
            {technicalStep.call_date === null && (
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

            <div className="step-status--bar waiting">
              <span className="step-status--bar-fill" style={{ width: '0%' }} />
              <span className="step-status--bar-parcent">0%</span>
              <span className="step-status--bar-detail">Waiting</span>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default StepTechnical;
