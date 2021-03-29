import React, { useEffect, useState, useRef } from "react";
import { Form, Carousel, Button, Input, Steps } from "antd";

import WelcomeStep1 from "./Step1";
import WelcomeStep2 from "./Step2";
import WelcomeStep3 from "./Step3";

import "./style.scss";

const { Step } = Steps;

const WelcomeSteps = ({ goNextStep }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const slider = useRef();

  const onFinishName = (value) => {
    console.log(value);
  };

  function onChange(a, b, c) {
    console.log(a, b, c);
  }
  const contentStyle = {
    height: "160px",
    color: "#364d79",
    lineHeight: "160px",
    textAlign: "center",
    border: "1px solid #364d79",
  };

  return (
    <>
      <h1>A new approach to claiming tax benefits</h1>
      <div className='hello-page__description'>
        We use technology in combination with experienced consultants to give
        you visibility and maximise your benefit
      </div>
      <div className='hello-page__steps'>
        <h2>Start your work with three little steps</h2>
        <Steps current={currentStep}>
          <Step title='Company' />
          <Step title='Industry' />
          <Step title='Numbers' />
        </Steps>
      </div>

      <Carousel
        afterChange={onChange}
        ref={slider}
        swipe={false}
        dots={false}
        easing='ease-in-out'
        effect='fade'
        className='hello-page__steps_slider'
      >
        <div>
          <WelcomeStep1
            goNextStep={() => {
              slider.current.next();
              setCurrentStep(currentStep + 1);
            }}
          />
        </div>

        <div>
          {currentStep === 1 && (
            <WelcomeStep2
              goNextStep={() => {
                slider.current.next();
                setCurrentStep(currentStep + 1);
              }}
              goPrevStep={() => {
                slider.current.prev();
                setCurrentStep(currentStep - 1);
              }}
            />
          )}
        </div>
        <div>
          <div>
            {currentStep === 2 && (
              <WelcomeStep3
                goNextStep={() => {
                  goNextStep();
                }}
                goPrevStep={() => {
                  slider.current.prev();
                  setCurrentStep(currentStep - 1);
                }}
              />
            )}
          </div>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </>
  );
};

export default WelcomeSteps;
