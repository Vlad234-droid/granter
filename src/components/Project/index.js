import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import lockr from 'lockr';
import { bindActionCreators } from 'redux';
import { Tooltip, Upload, Dropdown, Button, Spin } from 'antd';
import { setSkipFile, uploadFile, deleteFile } from '../../core/services';

import iconUpload from '../../assets/img/icon-upload.svg';
import iconUploadRed from '../../assets/img/icon-upload-red.svg';
import iconSkip from '../../assets/img/icon-skip.svg';
import iconUndo from '../../assets/img/icon-undo.svg';
import iconPdf from '../../assets/img/icon-pdf.svg';
import iconComment from '../../assets/img/icon-comment.svg';

import { IconDeleteFile } from '../icons';

import './style.scss';
import { Link } from 'react-router-dom';

const { Dragger } = Upload;
const { REACT_APP_API_URL } = process.env;

const Project = ({ file, removeButton, onRed, onAction, status }) => {
  const [onRemoveDropdown, setOnRemoveDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const activeClaimId = useSelector((state) => state.user.activeClaimId);

  const onDelete = () => {
    setLoading(true);
    setOnRemoveDropdown(false);
    deleteFile(activeClaimId, file.id).then((data) => {
      setLoading(false);
      onAction(data.document);
    });
  };

  const statusName = (s) => {
    let status = {};
    switch (s) {
      case 2:
        status = {
          class: 'review',
          name: 'On Review',
        };
        break;
      case 3:
        status = {
          class: 'approved',
          name: 'Approved',
        };
        break;

      default:
        break;
    }
    return status;
  };

  const onEditProject = () => {
    // const { addProjectDetails } = bindActionCreators(actions, dispatch);
  };

  return (
    <div className={`step-file ${loading ? 'loading' : ''}`}>
      <div className="step-file-loading">
        <Spin />
      </div>
      <div className="step-file--title">
        <img src={iconPdf} alt="" />
        <Button type="link" onClick={onEditProject}>
          List of projects
        </Button>
        {removeButton && (
          <Dropdown
            placement="bottomRight"
            trigger="click"
            visible={onRemoveDropdown}
            onVisibleChange={(visible) => {
              if (!visible) setOnRemoveDropdown(false);
              onRed(visible);
            }}
            overlay={
              <div className="step-file--title-dropdown">
                <div className="dropdown-title">Are you sure you want to delete this Document?</div>
                <div className="dropdown-actions">
                  <Button
                    type="button"
                    onClick={(e) => {
                      setOnRemoveDropdown(false);
                      onRed(false);
                    }}>
                    Back
                  </Button>
                  <Button type="primary" onClick={onDelete} loading={loading}>
                    Delete
                  </Button>
                </div>
              </div>
            }>
            <button
              className="step-file--remove-button"
              onClick={() => {
                setOnRemoveDropdown(true);
              }}>
              <IconDeleteFile />
            </button>
          </Dropdown>
        )}
      </div>
      <div className="step-file--status">
        <div className={`status ${statusName(status).class}`}>{statusName(status).name}</div>
      </div>
    </div>
  );
};

export default Project;
