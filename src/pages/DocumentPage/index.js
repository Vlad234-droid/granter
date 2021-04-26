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

const DocumentPage = () => {
  return (
    <div className='document-details'>
      <div className='document-details__viewer'>
        <header className='document-details__header'>
          <Link to='/' className='header--back'>
            <img src={iconBack} alt='' />
            <span>To Dashboard</span>
          </Link>
          <a href='' className='header--download'>
            <img src={iconDownload} alt='' />
            <span>Download File</span>
          </a>
          <Dragger
            className='header--upload'
            name='file'
            // customRequest={customRequest}
            accept='application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
            showUploadList={false}
          >
            <img src={iconUpload} alt='' />
            <span>Upload New Version</span>
          </Dragger>
        </header>
        <article className='document-wrapper'>
          <DocumentViewer />
        </article>
      </div>
      <div className='document-details__comments'>
        <div className='document-details__comments_header'>
          <div className='header--title'>
            <IconComment />
            <span>Comments (4)</span>
          </div>
          <Select
            defaultValue='all'
            suffixIcon={<img src={iconSelectArrow} alt='' />}
            dropdownMatchSelectWidth={false}
          >
            <Option value='all'>All</Option>
            <Option value='latest'>Latest</Option>
          </Select>
        </div>
        <div className='document-details__comments_list'>
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </div>
        <div className='document-details__comments_new'>
          <Button type='primary'>New Comment</Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentPage;
