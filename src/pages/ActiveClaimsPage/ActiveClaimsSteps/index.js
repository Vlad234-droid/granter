import React from 'react';

import StepIntroduction from './StepIntroduction';
import StepFinancial from './StepFinancial';
import StepTechnical from './StepTechnical';
import StepDeliverables from './StepDeliverables';
import StepSubmission from './StepSubmission';

import './style.scss';

const ActiveClaimsSteps = ({ link }) => {
  return (
    <div className="active-claims__steps">
      <StepIntroduction link={link} />
      <StepFinancial link={link} />
      <StepTechnical link={link} />
      <StepDeliverables />
      <StepSubmission />
    </div>
  );
};

export default ActiveClaimsSteps;
