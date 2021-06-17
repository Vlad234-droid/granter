import React from 'react';

import StepIntroduction from './StepIntroduction';
import StepFinancial from './StepFinancial';
import StepTechnical from './StepTechnical';
import StepDeliverables from './StepDeliverables';
import StepSubmission from './StepSubmission';

import './style.scss';

const ActiveClaimsSteps = ({ link, activeClaimData, refreshCards }) => {
  return (
    <div className="active-claims__steps">
      <StepIntroduction link={link} activeClaimData={activeClaimData} refreshCards={refreshCards} />
      <StepFinancial link={link} activeClaimData={activeClaimData} refreshCards={refreshCards} />
      <StepTechnical link={link} activeClaimData={activeClaimData} refreshCards={refreshCards} />
      <StepDeliverables refreshCards={refreshCards} />
      <StepSubmission refreshCards={refreshCards} />
    </div>
  );
};

export default ActiveClaimsSteps;
