import React from 'react';

import StepIntroduction from './StepIntroduction';
import StepFinancial from './StepFinancial';
import StepTechnical from './StepTechnical';
import StepDeliverables from './StepDeliverables';
import StepSubmission from './StepSubmission';

import './style.scss';

const ActiveClaimsSteps = ({ link, activeClaimData }) => {
  return (
    <div className="active-claims__steps">
      <StepIntroduction link={link} activeClaimData={activeClaimData} />
      <StepFinancial link={link} activeClaimData={activeClaimData} />
      <StepTechnical link={link} activeClaimData={activeClaimData} />
      <StepDeliverables />
      <StepSubmission />
    </div>
  );
};

export default ActiveClaimsSteps;
