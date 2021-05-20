import React from 'react';

import './style.scss';

const StepDeliverables = () => {
  return (
    <section className="active-claims__steps_step deliverables">
      <h2>
        4<i>/</i>5 Deliverables
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
