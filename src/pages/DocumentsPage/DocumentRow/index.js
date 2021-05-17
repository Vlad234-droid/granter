import React, { useState } from 'react';
import { Checkbox, Dropdown, Button } from 'antd';
import { Link } from 'react-router-dom';

import { IconDeleteFile, IconDownload } from '../../../components/icons';

import iconPdf from '../../../assets/img/icon-pdf.svg';

import './style.scss';

const DocumentRow = ({ file, onFileSelect, onDeleteFile }) => {
  const [onRemoveDropdown, setOnRemoveDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

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
            <img src={iconPdf} alt="" />
            <span>{file.original_name}</span>
          </Link>
        </div>
      </td>
      <td className="actions">
        <div className="td-wrapper">
          <a href={file.url} target="_blank">
            <IconDownload />
          </a>
          {file.status === 3 ? (
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
                    <Button type="primary" onClick={onDeleteFile} loading={loading}>
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
            <button disabled>
              <IconDeleteFile />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default DocumentRow;
