import React from 'react';

import StepIntroduction from './StepIntroduction';
import StepFinancial from './StepFinancial';
import StepTechnical from './StepTechnical';
import StepDeliverables from './StepDeliverables';
import StepSubmission from './StepSubmission';

import './style.scss';

const ActiveClaimsSteps = () => {
  return (
    <div className="active-claims__steps">
      <StepIntroduction />
      <StepFinancial />
      <StepTechnical />
      <StepDeliverables />
      <StepSubmission />
    </div>
  );
};

export default ActiveClaimsSteps;
