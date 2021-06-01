import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import lockr from 'lockr';
import { Collapse, Upload, Dropdown, Button, Spin } from 'antd';
import { removeProject } from '../../core/services';

import arrow from '../../assets/img/icon-arrow-dropdown.svg';
import iconUpload from '../../assets/img/icon-upload.svg';
import iconUploadRed from '../../assets/img/icon-upload-red.svg';
import iconSkip from '../../assets/img/icon-skip.svg';
import iconFileS from '../../assets/img/icon-file-s.svg';
import iconPdf from '../../assets/img/icon-pdf.svg';
import iconFile from '../../assets/img/icon-file-s.svg';

import { IconDeleteFile } from '../icons';

import './style.scss';
import { Link } from 'react-router-dom';

const { Panel } = Collapse;

const { Dragger } = Upload;
const { REACT_APP_API_URL } = process.env;

const Project = ({ file, removeButton, onRed, onAction, index }) => {
  const [onRemoveDropdown, setOnRemoveDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const activeClaimId = useSelector((state) => state.user.activeClaimId);
  const history = useHistory();

  const onDelete = () => {
    setLoading(true);
    setOnRemoveDropdown(false);
    removeProject(activeClaimId, file.id).then((data) => {
      setLoading(false);
      onAction(file.id);
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
    history.push(`/project/${activeClaimId}/${file.id}`);
    // const { addProjectDetails } = bindActionCreators(actions, dispatch);
  };

  return (
    <div className={`step-file step-project ${loading ? 'loading' : ''}`}>
      <div className="step-file-loading">
        <Spin />
      </div>
      <div className="step-file--title">
        <img src={iconFileS} alt="" />
        <Button type="link" onClick={onEditProject}>
          {file.title}
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
        <div className={`status ${statusName(file.status).class}`}>{statusName(file.status).name}</div>
      </div>
      {file.documents?.length > 0 && (
        <Collapse bordered={false} ghost={true} expandIcon={() => <img src={arrow} alt={arrow} />}>
          <Panel header={`Show All (${file.documents.length})`} key="1">
            {file.documents.map((item) => (
              <div key={`sub-${item.id}`} className="step-sub">
                <div className="step-sub__title">
                  <img src={iconPdf} alt="project" />
                  <span>{item.name}</span>
                </div>
                {/* <div className="step-file--status">
                  <div className={`status ${statusName(item.status).class}`}>{statusName(item.status).name}</div>
                </div> */}
              </div>
            ))}
          </Panel>
        </Collapse>
      )}
    </div>
  );
};

export default Project;
