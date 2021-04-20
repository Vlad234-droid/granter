import React from "react";
import { Tooltip, Upload } from "antd";

import iconUpload from "../../assets/img/icon-upload.svg";
import iconUploadRed from "../../assets/img/icon-upload-red.svg";
import iconSkip from "../../assets/img/icon-skip.svg";
import iconPdf from "../../assets/img/icon-pdf.svg";
import iconComment from "../../assets/img/icon-comment.svg";

import "./style.scss";

const { Dragger } = Upload;

const UploadFile = ({ skipButton, file }) => {
  const onChangeUpload = (info, name) => {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
      console.log(name);
    }
    if (status === "done") {
      console.log(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      console.log(`${info.file.name} file upload failed.`);
    }
  };

  if (file.status !== 1)
    return (
      <div className='step-file'>
        <div className='step-file--title'>
          <img src={iconPdf} alt='' />
          <span>{file.name}</span>
        </div>
        <div className='step-file--status'>
          <div className={`status ${file.status}`}>On {file.status}</div>
          <div className='comments'>
            <img src={iconComment} alt='' />
            <span>0</span>
          </div>
        </div>
      </div>
    );

  return (
    <Tooltip
      placement='rightTop'
      title={file.is_skipped > 0 ? "" : "Upload PDF, XLSX or DOCX"}
    >
      <Dragger
        name='file'
        action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
        className='upload-file'
        disabled={file.is_skipped > 0 ? true : false}
        onChange={(info) => {
          onChangeUpload(info, "full-company");
        }}
      >
        <div className='upload-title'>
          <img src={iconUpload} alt='' />
          <span>{file.name}</span>
        </div>
        {skipButton && (
          <button
            className='upload-skip'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log(e);
            }}
          >
            <img src={iconSkip} alt='' />
            <span>Skip</span>
          </button>
        )}
        {!skipButton && (
          <div className='upload-status'>
            <img src={iconUploadRed} alt='' />
            <span>Not uploaded</span>
          </div>
        )}
      </Dragger>
    </Tooltip>
  );
};

export default UploadFile;
