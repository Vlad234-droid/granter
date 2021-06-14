import React, { useState, useEffect } from 'react';

import PDFSVG from '../../assets/img/PDF.svg';
import XLSXSVG from '../../assets/img/XLSX.svg';
import DOCSSVG from '../../assets/img/DOCS.svg';
import { IconDeleteFile } from '../icons';

import './style.scss';

const ProjectFileListItem = ({ originNode, file, fileList, actions }) => {
  const [extension, setExtension] = useState(null);

  useEffect(() => {
    if (!file.extension) {
      setExtension(file.name.match(/\.[0-9a-z]+$/i)[0]);
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
              onClick={actions.remove}
              className="ant-btn ant-btn-text ant-btn-sm ant-btn-icon-only ant-upload-list-item-card-actions-btn">
              <IconDeleteFile />
            </button>
          </span>
        </span>
      </div>
    </div>
  );
};

export default ProjectFileListItem;
