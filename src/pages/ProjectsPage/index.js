import React from "react";
import { Link } from "react-router-dom";

import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { Upload, Select, Button } from "antd";

import DocumentViewer from "../../components/DocumentViewer";
import Comment from "../../components/Comment";
import { IconComment } from "../../components/icons";

import iconBack from "../../assets/img/arrow-left.svg";
import iconDownload from "../../assets/img/icon-download.svg";
import iconUpload from "../../assets/img/icon-upload-blue.svg";
import iconSelectArrow from "../../assets/img/iceon-select-arrow.svg";

import "./style.scss";

const { Dragger } = Upload;
const { Option } = Select;

const ProjectsPage = () => {
  return (
    <div className='document-details'>
      <h1>Project</h1>
    </div>
  );
};

export default ProjectsPage;
