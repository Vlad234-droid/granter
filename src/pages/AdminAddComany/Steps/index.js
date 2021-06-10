import React, { useState, useRef } from 'react';
import { Carousel, Steps } from 'antd';

import WelcomeStep1 from './Step1';
import WelcomeStep2 from './Step2';
import WelcomeStep3 from './Step3';

import './style.scss';

const { Step } = Steps;

const WelcomeSteps = ({ goNextStep, setMaxPrice, setMinPrice }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const slider = useRef();

  const contentStyle = {
    height: '160px',
    color: '#364d79',
    lineHeight: '160px',
    textAlign: 'center',
    border: '1px solid #364d79',
  };

  return (
    <>
      <h1>Add Client</h1>
      <div className="hello-page__steps">
        <Steps current={currentStep}>
          <Step title="Company" />
          <Step title="Industry" />
          <Step title="Numbers" />
        </Steps>
      </div>

      <Carousel
        ref={slider}
        swipe={false}
        dots={false}
        easing="ease-in-out"
        effect="fade"
        className="hello-page__steps_slider">
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
                setMaxPrice={setMaxPrice}
                setMinPrice={setMinPrice}
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
