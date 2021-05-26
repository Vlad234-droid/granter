import React, { useState } from 'react';
import { Checkbox, Dropdown, Button, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { IconDeleteFile, IconDownload } from '../../../components/icons';
import PDFSVG from '../../../assets/img/PDF.svg';
import XLSXSVG from '../../../assets/img/XLSX.svg';
import DOCSSVG from '../../../assets/img/DOCS.svg';
import './style.scss';

const DocumentRow = ({ file, onFileSelect, onDeleteFile }) => {
  const [onRemoveDropdown, setOnRemoveDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkForExt = (extension) => {
    switch (extension) {
      case 'doc':
        return DOCSSVG;
      case 'pdf':
        return PDFSVG;
      case 'xls':
        return XLSXSVG;
      default:
        return extension;
    }
  };

  return (
    <tr className={onRemoveDropdown ? 'red' : ''}>
      <td className="select">
        <Checkbox
          onChange={(e) => {
            onFileSelect(e, file.id);
          }}
          checked={file.checked}
        />
      </td>
      <td className="name">
        <div className="td-wrapper">
          <Link to={`/document/${file.claim_id}/${file.id}/`}>
            <img src={checkForExt(file.extension)} alt="document-file" />
            <span>{file.original_name}</span>
          </Link>
        </div>
      </td>
      <td className="actions">
        <div className="td-wrapper">
          <a href={file.url} target="blank">
            <IconDownload />
          </a>
          {!file.has_unresolved_comments ? (
            <Dropdown
              placement="bottomRight"
              trigger="click"
              visible={onRemoveDropdown}
              onVisibleChange={(visible) => {
                if (!visible) setOnRemoveDropdown(false);
                // onRed(visible);
              }}
              overlay={
                <div className="step-file--title-dropdown">
                  <div className="dropdown-title">Are you sure you want to delete this Document?</div>
                  <div className="dropdown-actions">
                    <Button
                      type="button"
                      onClick={(e) => {
                        setOnRemoveDropdown(false);
                        // onRed(false);
                      }}>
                      Back
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => {
                        setLoading(true);
                        onDeleteFile(file.claim_id, file.id);
                      }}
                      loading={loading}>
                      Delete
                    </Button>
                  </div>
                </div>
              }>
              <button
                className="step-file--remove"
                onClick={() => {
                  setOnRemoveDropdown(true);
                }}>
                <IconDeleteFile />
              </button>
            </Dropdown>
          ) : (
            <Tooltip placement="left" title="This file cannot be deleted because it contains unresolved comment">
              <button className="step-file--remove" disabled>
                <IconDeleteFile />
              </button>
            </Tooltip>
          )}
        </div>
      </td>
    </tr>
  );
};

export default DocumentRow;
