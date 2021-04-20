import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Tooltip, Skeleton } from "antd";

import services from "../../../../core/services";

import UploadFile from "../../../../components/UploadFile";
import { IconWarning } from "../../../../components/icons";
import iconScheduled from "../../../../assets/img/icon-scheduled.svg";
import iconCalendar from "../../../../assets/img/icon-calendar.svg";
import iconApproved from "../../../../assets/img/icon-approved.svg";

import "./style.scss";

const { getIntroductionClaimStep } = services;

const StepIntroduction = () => {
  const [introductionStep, setIntroductionStep] = useState(null);
  const activeClaimId = useSelector((state) => state.user.activeClaimId);

  useEffect(() => {
    if (activeClaimId) {
      getIntroductionClaimStep(activeClaimId).then((data) => {
        setIntroductionStep(data);
        console.log("getIntroductionClaimStep", data);
      });
    }
  }, [activeClaimId]);

  return (
    <section className='active-claims__steps_step introduction'>
      <h2>
        <p>
          1<i>/</i>5 Introduction
        </p>
        <Tooltip title='Required Files'>
          <span>
            <IconWarning />
          </span>
        </Tooltip>
      </h2>
      {!introductionStep ? (
        <Skeleton active />
      ) : (
        <>
          <div className='step-actions'>
            {introductionStep.documents.map((item) => (
              <UploadFile
                key={`introduction-document-${item.id}`}
                file={item}
              />
            ))}
          </div>
          <div className='step-status'>
            {introductionStep.call_date === null && (
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

export default StepIntroduction;
