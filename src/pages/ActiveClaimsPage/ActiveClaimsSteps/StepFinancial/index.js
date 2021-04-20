import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Skeleton } from "antd";
import services from "../../../../core/services";

import UploadFile from "../../../../components/UploadFile";
import iconScheduled from "../../../../assets/img/icon-scheduled.svg";
import iconCalendar from "../../../../assets/img/icon-calendar.svg";
import iconApproved from "../../../../assets/img/icon-approved.svg";

import "./style.scss";

const { getFinancialClaimStep } = services;

const StepFinancial = () => {
  const [financialStep, setFinancialStep] = useState(null);
  const activeClaimId = useSelector((state) => state.user.activeClaimId);

  useEffect(() => {
    if (activeClaimId) {
      getFinancialClaimStep(activeClaimId)
        .then((data) => {
          setFinancialStep(data);
          console.log("getFinancialClaimStep", data);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [activeClaimId]);

  return (
    <section className='active-claims__steps_step financial'>
      <h2>
        2<i>/</i>5 Financial
      </h2>

      {!financialStep ? (
        <Skeleton active />
      ) : (
        <>
          <div className='step-actions'>
            {financialStep.documents.map((item) => (
              <UploadFile
                key={`introduction-document-${item.id}`}
                file={item}
                skipButton={true}
              />
            ))}
          </div>
          <div className='step-status'>
            {financialStep.call_date === null && (
              <button className='step-status--call-schedule'>
                <img src={iconCalendar} alt='' />
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

            <div className='step-status--bar waiting'>
              <span className='step-status--bar-fill' style={{ width: "0%" }} />
              <span className='step-status--bar-parcent'>0%</span>
              <span className='step-status--bar-detail'>Waiting</span>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default StepFinancial;
