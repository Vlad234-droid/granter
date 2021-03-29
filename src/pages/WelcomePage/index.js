import React, { useState, useRef } from "react";
import { Carousel } from "antd";
import Layout from "../../components/LayoutGuest/Layout";

import WelcomeSteps from "./Steps";
import WelcomeСonfirm from "./Сonfirm";
import RegistrationForm from "./RegistrationForm";

import "./style.scss";

const WelcomePage = (props) => {
  const slider = useRef();

  return (
    <Layout isLogged={false} className='hello-page' mode='registration'>
      <div className='hello-page__wrapper'>
        <Carousel
          ref={slider}
          swipe={false}
          dots={false}
          easing='ease-in-out'
          effect='fade'
          className='hello-page__steps_slider'
        >
          <div>
            {/* {!confirmStep && (
              
            )} */}
            <WelcomeSteps
              goNextStep={() => {
                slider.current.next();
                // setConfirmStep(true);
              }}
            />
          </div>
          <div>
            <WelcomeСonfirm
              goNextStep={() => {
                slider.current.next();
                // setConfirmStep(false);
              }}
              goPrevStep={() => {
                slider.current.prev();
                // setConfirmStep(false);
              }}
            />
          </div>
          <div>
            <RegistrationForm />
          </div>
        </Carousel>
      </div>
    </Layout>
  );
};

export default WelcomePage;
