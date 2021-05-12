import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Skeleton, Button } from "antd";
import services from "../../../../core/services";

import UploadFile from "../../../../components/UploadFile";
import iconScheduled from "../../../../assets/img/icon-scheduled.svg";
import iconCalendar from "../../../../assets/img/icon-calendar.svg";
import iconApproved from "../../../../assets/img/icon-approved.svg";

import "./style.scss";

const StepSubmission = () => {
  return (
    <section className='active-claims__steps_step submission'>
      <h2>
        5<i>/</i>5 Submission
      </h2>
      <div className='step-actions'>
        <div className='step-report-empty'>Final submission instructions</div>
        <div className='step-report-empty'>Amended tax computations</div>
        <div className='step-report-empty'>CT600</div>
        <div className='step-report-empty'>Final report</div>
      </div>
      <div className='step-status'>
        <Button type='primary' disabled className='step-status--approve'>
          Approve
        </Button>
        <div className='step-status--bar waiting'>
          <span className='step-status--bar-fill' style={{ width: "0%" }} />
          <span className='step-status--bar-parcent'>0%</span>
          <span className='step-status--bar-detail'>Waiting</span>
        </div>
      </div>
    </section>
  );
};

export default StepSubmission;
