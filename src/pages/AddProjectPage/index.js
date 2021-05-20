import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'antd';

import Layout from '../../components/LayoutDashboard/Layout';
import Steps from './Steps';
import Сonfirm from './Сonfirm';

import arrowLeft from '../../assets/img/arrow-left.svg';

import './style.scss';

const AddProjectPage = () => {
  const [indexStep, setIndexStep] = useState(null);

  const slider = useRef();
  return (
    <Layout isLogged={false} className="dashboard">
      <div className="add-project">
        <div className="add-project__header">
          <Link to="/profile/">
            <img src={arrowLeft} alt="" />
            <span>To Profile</span>
          </Link>
        </div>
        <div className="add-project__wrapper">
          <h2>Add new company with 3 little steps</h2>
          <Carousel
            beforeChange={(prevIndex, newIndex) => {
              setIndexStep(() => newIndex);
            }}
            ref={slider}
            swipe={false}
            dots={false}
            easing="ease-in-out"
            effect="fade"
            className="hello-page__steps_slider">
            <div>
              <Steps
                goNextStep={() => {
                  slider.current.next();
                }}
              />
            </div>
            <div>
              <Сonfirm
                indexStep={indexStep}
                goNextStep={() => {
                  slider.current.next();
                }}
                goPrevStep={() => {
                  slider.current.prev();
                }}
              />
            </div>
          </Carousel>
        </div>
      </div>
    </Layout>
  );
};

export default AddProjectPage;
