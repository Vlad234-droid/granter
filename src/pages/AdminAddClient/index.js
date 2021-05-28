import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'antd';
import Steps from './Steps';
import Сonfirm from './Confirm/index';
import arrowLeft from '../../assets/img/arrow-left.svg';
import './style.scss';
import LayOutAdmin from '../../components/LayOutAdmin';
const AdminAddClient = () => {
  const [indexStep, setIndexStep] = useState(null);
  const slider = useRef();

  return (
    <LayOutAdmin>
      <div className="add-project">
        <div className="add-project__wrapper">
          <h2>Add Client</h2>
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
    </LayOutAdmin>
  );
};

export default AdminAddClient;
