import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Carousel, Select, Button } from "antd";

import Layout from "../../components/LayoutDashboard/Layout";
import Steps from "./Steps";
import Сonfirm from "./Сonfirm";

import arrowLeft from "../../assets/img/arrow-left.svg";

import DocumentViewer from "../../components/DocumentViewer";
import Comment from "../../components/Comment";
import { IconComment } from "../../components/icons";

import iconBack from "../../assets/img/arrow-left.svg";
import iconDownload from "../../assets/img/icon-download.svg";
import iconUpload from "../../assets/img/icon-upload-blue.svg";
import iconSelectArrow from "../../assets/img/iceon-select-arrow.svg";

import "./style.scss";

const AddProjectPage = () => {
  const slider = useRef();
  return (
    <Layout isLogged={false} className='dashboard'>
      <div className='add-project'>
        <div className='add-project__header'>
          <Link to='/profile/'>
            <img src={arrowLeft} alt='' />
            <span>To Profile</span>
          </Link>
        </div>
        <div className='add-project__wrapper'>
          <h2>Add new company with 3 little steps</h2>
          <Carousel
            ref={slider}
            swipe={false}
            dots={false}
            easing='ease-in-out'
            effect='fade'
            className='hello-page__steps_slider'
          >
            <div>
              <Steps
                goNextStep={() => {
                  slider.current.next();
                }}
              />
            </div>
            <div>
              <Сonfirm
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
