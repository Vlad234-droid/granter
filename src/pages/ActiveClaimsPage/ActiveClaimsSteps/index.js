import React from "react";
import { Tooltip, Upload } from "antd";

import StepIntroduction from "./StepIntroduction";
import StepFinancial from "./StepFinancial";
import StepTechnical from "./StepTechnical";
import StepDeliverables from "./StepDeliverables";
import StepSubmission from "./StepSubmission";

import { IconWarning } from "../../../components/icons";

import "./style.scss";

const ActiveClaimsSteps = () => {
  return (
    <div className='active-claims__steps'>
      <StepIntroduction />
      <StepFinancial />
      <StepTechnical />
      <StepDeliverables />
      <StepSubmission />
    </div>
  );
};

export default ActiveClaimsSteps;
