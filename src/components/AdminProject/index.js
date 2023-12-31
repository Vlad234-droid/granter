import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Collapse, Dropdown, Button, Spin, Menu } from 'antd';
import arrow from '../../assets/img/icon-arrow-dropdown.svg';
import iconFileS from '../../assets/img/icon-file-s.svg';
import { approveProject, removeProject } from '../../core/adminServices';
import { IconDeleteFile, AdminArrow } from '../icons';
import './style.scss';
import PDFSVG from '../../assets/img/PDF.svg';
import XLSXSVG from '../../assets/img/XLSX.svg';
import DOCSSVG from '../../assets/img/DOCS.svg';

const { Panel } = Collapse;

const AdminProject = ({ file, removeButton, onRed, onDelete, onChangeStatus, index, checkForAllStatus }) => {
  const [onRemoveDropdown, setOnRemoveDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [extension, setExtension] = useState(null);
  const history = useHistory();
  const { id: activeClaimId } = useParams();

  useEffect(() => {
    if (file.extension) setExtension(file.extension ? `.${file.extension}` : file.extension);
  }, []);

  const onDeleteProject = () => {
    setLoading(true);
    setOnRemoveDropdown(false);
    removeProject(activeClaimId, file.id).then((data) => {
      setLoading(false);
      onDelete(file.id);
    });
  };

  const statusName = (s) => {
    let status = {};
    switch (s) {
      case 2:
        status = {
          class: 'review',
          name: 'In Review',
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
    history.push(`/admin/project/${activeClaimId}/${file.id}`);
    // const { addProjectDetails } = bindActionCreators(actions, dispatch);
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

  return (
    <div className={`step-file step-project ${loading ? 'loading' : ''}`}>
      <div className="step-file-loading">
        <Spin />
      </div>
      <div className="step-file--title">
        <img src={extension ? checkForExt(extension) : iconFileS} className={extension ? 'extension' : ''} alt="" />
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
                  <Button type="primary" onClick={onDeleteProject} loading={loading}>
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
      <div className="wrapper_tech_rev admin" id={`wrapper_tech_rev-${file.id}`}>
        <Dropdown
          overlayClassName="admin_drop_approved_adminPR"
          trigger="click"
          getPopupContainer={() => document.querySelector(`#wrapper_tech_rev-${file.id}`)}
          overlay={
            <Menu>
              {file.status === 2 && (
                <Menu.Item>
                  <div
                    className="status approved"
                    onClick={() => {
                      setLoading(() => true);
                      approveProject(file.id, 3).then((data) => {
                        if (data) {
                          checkForAllStatus();
                          const file = {
                            ...data.project,
                            status: Number(data.project.status),
                          };
                          onChangeStatus(file);
                          setLoading(() => false);
                        }
                      });
                    }}>
                    <b>Approve</b>
                  </div>
                </Menu.Item>
              )}
              {file.status === 3 && (
                <Menu.Item>
                  <div
                    className="status on_review"
                    onClick={() => {
                      setLoading(() => true);
                      approveProject(file.id, 2).then((data) => {
                        if (data) {
                          checkForAllStatus();
                          const file = {
                            ...data.project,
                            status: Number(data.project.status),
                          };
                          onChangeStatus(file);
                          setLoading(() => false);
                        }
                      });
                    }}>
                    <b>In Review</b>
                  </div>
                </Menu.Item>
              )}
            </Menu>
          }
          placement="bottomCenter">
          <div className="step-file--status admin">
            <div
              style={{ cursor: 'pointer', position: 'relative' }}
              id={`project_id_${file.id}`}
              className={`status ${statusName(file.status).class}`}>
              {statusName(file.status).name}
              <AdminArrow />
            </div>
          </div>
        </Dropdown>
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

export default AdminProject;
