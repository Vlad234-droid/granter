import React, { useRef, useState } from 'react';
import { Carousel } from 'antd';
import Layout from '../../components/LayoutGuest/Layout';

import WelcomeSteps from './Steps';
import WelcomeСonfirm from './Сonfirm';
import RegistrationForm from './RegistrationForm';

import './style.scss';

const WelcomePage = (props) => {
  const slider = useRef();
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  return (
    <Layout isLogged={false} className="hello-page" mode="registration">
      <div className="hello-page__wrapper">
        <Carousel
          ref={slider}
          swipe={false}
          dots={false}
          easing="ease-in-out"
          effect="fade"
          className="hello-page__steps_slider">
          <div>
            <WelcomeSteps
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              goNextStep={() => {
                slider.current.next();
              }}
            />
          </div>
          <div>
            <WelcomeСonfirm
              minPrice={minPrice}
              maxPrice={maxPrice}
              goNextStep={() => {
                slider.current.next();
              }}
              goPrevStep={() => {
                slider.current.prev();
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
