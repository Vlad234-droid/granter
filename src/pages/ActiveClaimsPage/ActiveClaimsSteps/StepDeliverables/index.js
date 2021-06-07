import React from 'react';
import { Tooltip } from 'antd';

import IconInfo from '../../../../assets/img/icon-Info-orange.svg';

import './style.scss';

const StepDeliverables = () => {
  return (
    <section className="active-claims__steps_step deliverables">
      <h2>
        <p>
          4<i>/</i>5 Deliverables
        </p>
        <Tooltip title="You don’t have to upload files for this stage. The Gratner team will do it for you when all the previous stages will be approved">
          <span>
            <img src={IconInfo} alt="" />
          </span>
        </Tooltip>
      </h2>
      <div className="step-actions">
        <div className="step-report-empty">Technical report narrative</div>
        <div className="step-report-empty">Financial analysis</div>
      </div>
      <div className="step-status">
        <div className="step-status--bar waiting">
          <span className="step-status--bar-fill" style={{ width: '0%' }} />
          <span className="step-status--bar-parcent">0%</span>
          <span className="step-status--bar-detail">Waiting</span>
        </div>
      </div>
    </section>
  );
};

export default StepDeliverables;
