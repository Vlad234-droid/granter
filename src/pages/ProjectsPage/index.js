import React from "react";
import { Link } from "react-router-dom";

import { Form, Select, Button, Input } from "antd";

import { IconComment } from "../../components/icons";
import Project from "./Project";

import iconBack from "../../assets/img/arrow-left.svg";
import iconDownload from "../../assets/img/icon-download.svg";
import iconUpload from "../../assets/img/icon-upload-blue.svg";
import iconSelectArrow from "../../assets/img/iceon-select-arrow.svg";

import "./style.scss";

const ProjectsPage = () => {
  return (
    <div className='projects'>
      <header>
        <div className='projects__header_wrapper'>
          <Link to='/active-claims/' className='header--back'>
            <img src={iconBack} alt='' />
            <span>To Dashboard</span>
          </Link>
        </div>
      </header>
      <div className='projects__wrapper'>
        <div className='projects-list'>
          <Project />
        </div>
        <div className='projects__viewer'>Viewer</div>
      </div>
    </div>
  );
};

export default ProjectsPage;
