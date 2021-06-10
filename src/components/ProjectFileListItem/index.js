import React, { useState, useEffect } from 'react';

import PDFSVG from '../../assets/img/PDF.svg';
import XLSXSVG from '../../assets/img/XLSX.svg';
import DOCSSVG from '../../assets/img/DOCS.svg';

import './style.scss';

const ProjectFileListItem = ({ originNode, file, fileList }) => {
  const [extension, setExtension] = useState(null);
  console.log('originNode', originNode);
  console.log('file', file);
  console.log('fileList', fileList);

  useEffect(() => {
    if (!file.extension && file.url) {
      setExtension(file.url.match(/\.[0-9a-z]+$/i)[0]);
    }
  }, []);

  const checkForExt = (extension) => {
    switch (extension) {
      case '.doc':
        return DOCSSVG;
      case '.docx':
        return DOCSSVG;
      case '.pdf':
        return PDFSVG;
      case '.xls':
        return XLSXSVG;
      case '.xlsx':
        return XLSXSVG;
      default:
        return extension;
    }
  };

  return (
    <div className="ant-upload-list-item ant-upload-list-item-undefined ant-upload-list-item-list-type-text">
      <div className="ant-upload-list-item-info">
        <span className="ant-upload-span">
          <div className="ant-upload-text-icon">
            <span role="img" aria-label="paper-clip" className="anticon anticon-paper-clip">
              <img src={checkForExt(extension)} alt="" />
            </span>
          </div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="ant-upload-list-item-name"
            title="EF3e_elem_filetest_12a.doc"
            href="http://granter.get-code.net/api/public/storage/documents/projects/ef3e-elem-filetest-12a_1623263703.doc">
            {file.name}
          </a>
          <span className="ant-upload-list-item-card-actions">
            <button
              title="Remove file"
              type="button"
              className="ant-btn ant-btn-text ant-btn-sm ant-btn-icon-only ant-upload-list-item-card-actions-btn">
              <svg
                width="15"
                height="15"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="icon-delete-file">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 3H16.5C16.6989 3 16.8897 3.07902 17.0303 3.21967C17.171 3.36032 17.25 3.55109 17.25 3.75C17.25 3.94891 17.171 4.13968 17.0303 4.28033C16.8897 4.42098 16.6989 4.5 16.5 4.5H15.6705L14.5425 14.664C14.4406 15.5813 14.004 16.4288 13.3163 17.0443C12.6285 17.6598 11.738 18.0001 10.815 18H7.185C6.26205 18.0001 5.37148 17.6598 4.68373 17.0443C3.99599 16.4288 3.55939 15.5813 3.4575 14.664L2.328 4.5H1.5C1.30109 4.5 1.11032 4.42098 0.96967 4.28033C0.829018 4.13968 0.75 3.94891 0.75 3.75C0.75 3.55109 0.829018 3.36032 0.96967 3.21967C1.11032 3.07902 1.30109 3 1.5 3H6C6 2.20435 6.31607 1.44129 6.87868 0.87868C7.44129 0.31607 8.20435 0 9 0C9.79565 0 10.5587 0.31607 11.1213 0.87868C11.6839 1.44129 12 2.20435 12 3ZM9 1.5C8.60218 1.5 8.22064 1.65804 7.93934 1.93934C7.65804 2.22064 7.5 2.60218 7.5 3H10.5C10.5 2.60218 10.342 2.22064 10.0607 1.93934C9.77936 1.65804 9.39782 1.5 9 1.5ZM6.75 7.5V13.5C6.75 13.6989 6.82902 13.8897 6.96967 14.0303C7.11032 14.171 7.30109 14.25 7.5 14.25C7.69891 14.25 7.88968 14.171 8.03033 14.0303C8.17098 13.8897 8.25 13.6989 8.25 13.5V7.5C8.25 7.30109 8.17098 7.11032 8.03033 6.96967C7.88968 6.82902 7.69891 6.75 7.5 6.75C7.30109 6.75 7.11032 6.82902 6.96967 6.96967C6.82902 7.11032 6.75 7.30109 6.75 7.5ZM11.0303 6.96967C10.8897 6.82902 10.6989 6.75 10.5 6.75C10.3011 6.75 10.1103 6.82902 9.96967 6.96967C9.82902 7.11032 9.75 7.30109 9.75 7.5V13.5C9.75 13.6989 9.82902 13.8897 9.96967 14.0303C10.1103 14.171 10.3011 14.25 10.5 14.25C10.6989 14.25 10.8897 14.171 11.0303 14.0303C11.171 13.8897 11.25 13.6989 11.25 13.5V7.5C11.25 7.30109 11.171 7.11032 11.0303 6.96967Z"
                  className="icon-fill"></path>
              </svg>
            </button>
          </span>
        </span>
      </div>
    </div>
  );
};

export default ProjectFileListItem;
