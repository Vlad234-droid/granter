import React from 'react';
import { Button, Tooltip } from 'antd';

import IconInfo from '../../../../assets/img/icon-Info-orange.svg';

import './style.scss';

const StepSubmission = () => {
  return (
    <section className="active-claims__steps_step submission">
      <h2>
        <p>
          5<i>/</i>5 Submission
        </p>
        <Tooltip
          placement="topRight"
          title="You don’t have to upload files for this stage. The Gratner team will do it for you when all the previous stages will be approved">
          <span>
            <img src={IconInfo} alt="" />
          </span>
        </Tooltip>
      </h2>
      <div className="step-actions">
        <div className="step-report-empty">Final submission instructions</div>
        <div className="step-report-empty">Amended tax computations</div>
        <div className="step-report-empty">CT600</div>
        <div className="step-report-empty">Final report</div>
      </div>
      <div className="step-status">
        <Button type="primary" disabled className="step-status--approve">
          Approve
        </Button>
        <div className="step-status--bar waiting">
          <span className="step-status--bar-fill" style={{ width: '0%' }} />
          <span className="step-status--bar-parcent">0%</span>
          <span className="step-status--bar-detail">Waiting</span>
        </div>
      </div>
    </section>
  );
};

export default StepSubmission;
