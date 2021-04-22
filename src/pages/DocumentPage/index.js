import React from "react";
import { Link } from "react-router-dom";
import FileViewer from "react-file-viewer";
import { Upload } from "antd";

import iconBack from "../../assets/img/arrow-left.svg";
import iconDownload from "../../assets/img/icon-download.svg";
import iconUpload from "../../assets/img/icon-upload-blue.svg";
//import file from "../../assets/PrivacyPolicy.docx";

const { Dragger } = Upload;

const file =
  "https://file-examples-com.github.io/uploads/2017/02/file_example_XLSX_50.xlsx";
const type = "xlsx";

const DocumentPage = () => {
  console.log(file);

  const onGridSort = (e) => {
    console.log(e);
  };

  return (
    <div className='document-details'>
      <div className='document-details__viewer'>
        <header>
          <Link to='/'>
            <img src={iconBack} alt='' />
            <span>To Dashboard</span>
          </Link>
          <a href=''>
            <img src={iconDownload} alt='' />
            <span>Download File</span>
          </a>
          <Dragger>
            <img src={iconUpload} alt='' />
            <span>Upload New Version</span>
          </Dragger>
        </header>
        <article className='document-view'>
          <FileViewer fileType={type} filePath={file} onGridSort={onGridSort} />
        </article>
      </div>
      <div className='document-details__comments'>TODO Comments</div>
    </div>
  );
};

export default DocumentPage;
