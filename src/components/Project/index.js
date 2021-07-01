import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import lockr from 'lockr';
import { Collapse, Upload, Dropdown, Button, Spin } from 'antd';
import { removeProject } from '../../core/services';
import { bindActionCreators } from 'redux';
import arrow from '../../assets/img/icon-arrow-dropdown.svg';
import iconFileS from '../../assets/img/icon-file-s.svg';

import PDFSVG from '../../assets/img/PDF.svg';
import XLSXSVG from '../../assets/img/XLSX.svg';
import DOCSSVG from '../../assets/img/DOCS.svg';
import actions from '../../core/actions';
import { IconDeleteFile } from '../icons';
import { useDispatch } from 'react-redux';
import './style.scss';
import { Link } from 'react-router-dom';

const { Panel } = Collapse;

const { Dragger } = Upload;
const { REACT_APP_API_URL } = process.env;

const Project = ({ detailsShow, file, removeButton, onRed, onAction, index }) => {
  const [onRemoveDropdown, setOnRemoveDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const activeClaimId = useSelector((state) => state.user.activeClaimId);
  const history = useHistory();
  const dispatch = useDispatch();
  const { blurActiveSteps } = bindActionCreators(actions, dispatch);

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

  const onEditProject = () => {
    if (detailsShow) blurActiveSteps();
    history.push(`/project/${activeClaimId}/${file.id}`);
    // const { addProjectDetails } = bindActionCreators(actions, dispatch);
  };

  return (
    <div className={`step-file step-project ${loading ? 'loading' : ''}`}>
      <div className="step-file-loading">
        <Spin />
      </div>
      <div className="step-file--title">
        <div onClick={onEditProject} style={{ cursor: 'pointer' }}>
          <img src={iconFileS} alt="iconFileS" />
          <Button type="link">{file.title}</Button>
        </div>
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
                  <img src={checkForExt(item.url.match(/\.[0-9a-z]+$/i)[0])} alt="project" />
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
