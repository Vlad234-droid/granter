import React, { useState } from 'react';
import { Tooltip, Upload, Button, Spin, Dropdown, Menu } from 'antd';
import { setSkipFile, uploadFile, deleteFile } from '../../core/services';
import iconUpload from '../../assets/img/icon-upload.svg';
import iconUploadRed from '../../assets/img/icon-upload-red.svg';
import iconSkip from '../../assets/img/icon-skip.svg';
import iconUndo from '../../assets/img/icon-undo.svg';
import iconPdf from '../../assets/img/icon-pdf.svg';
import iconComment from '../../assets/img/icon-comment.svg';
import PDFSVG from '../../assets/img/PDF.svg';
import XLSXSVG from '../../assets/img/XLSX.svg';
import DOCSSVG from '../../assets/img/DOCS.svg';
import { IconDeleteFile } from '../icons';
import './style.scss';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { approveDocument } from '../../core/adminServices/claimServices';
import { AdminArrow } from '../../components/icons';

const { Dragger } = Upload;

const AdminUploadFile = ({ skipButton, file, removeButton, onRed, onAction, checkForAllStatus }) => {
  const [onRemoveDropdown, setOnRemoveDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const customRequest = (e) => {
    setLoading(true);
    uploadFile(id, file.id, e.file).then((data) => {
      onAction(data.document);
      setLoading(false);
    });
    e.onSuccess('ok');
  };

  const onDelete = () => {
    setLoading(true);
    setOnRemoveDropdown(false);
    deleteFile(id, file.id).then((data) => {
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

  const checkForExt = (original_name) => {
    const extensions = original_name.split('.');
    const extension = extensions[extensions.length - 1];
    switch (extension) {
      case 'doc':
        return DOCSSVG;
      case 'docx':
        return DOCSSVG;
      case 'pdf':
        return PDFSVG;
      case 'xls':
        return XLSXSVG;
      case 'xlsx':
        return XLSXSVG;
      default:
        return extension;
    }
  };

  // if uploaded
  if (file.status > 1 && file.is_skipped < 1)
    return (
      <div className={`step-file ${loading ? 'loading' : ''}`}>
        <div className="step-file-loading">
          <Spin />
        </div>
        <div className={`step-file--title admin ${file.name === 'Full company accounts' ? 'intro' : ''}`}>
          <img src={checkForExt(file.original_name)} alt={file.original_name} />
          <Link to={`/document/${file.claim_id}/${file.id}/`}>{file.name}</Link>
          {removeButton &&
            (!file.has_unresolved_comments ? (
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
                  className="step-file--remove-button admin"
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
            ))}
        </div>
        <div className="step-file--status admin">
          <Dropdown
            overlayClassName="admin_drop_approved"
            trigger="click"
            overlay={
              <Menu>
                {file.status === 2 && (
                  <Menu.Item>
                    <div
                      className="status approved"
                      onClick={() => {
                        checkForAllStatus();
                        approveDocument(file.id, 3).then((data) => {
                          // setLoading(() => true);
                          // if (data.success) {
                          //   setLoading(() => false);
                          // }
                          //console.log('data:', data);
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
                      onClick={() =>
                        approveDocument(file.id, 3).then((data) => {
                          // setLoading(() => true);
                          // if (data.success) {
                          //   setLoading(() => false);
                          // }
                          //console.log('data:', data);
                        })
                      }>
                      <b>On Review</b>
                    </div>
                  </Menu.Item>
                )}
              </Menu>
            }
            placement="bottomCenter">
            <div style={{ cursor: 'pointer' }} id="status" className={`status ${statusName(file.status).class}`}>
              {statusName(file.status).name}
              <AdminArrow />
            </div>
          </Dropdown>
          <div className="comments">
            <img src={iconComment} alt="" />
            <span>{file.comments_count}</span>
          </div>
        </div>
      </div>
    );

  return (
    // if not upload
    <Tooltip placement="rightTop" title={file.is_skipped > 0 ? '' : 'Upload PDF, XLSX or DOCX'}>
      <Dragger
        name="file"
        customRequest={customRequest}
        accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        className={`upload-file ${loading ? 'loading' : ''} ${file.is_skipped === 1 ? 'skipped' : ''}`}
        showUploadList={false}>
        <div className="upload-loading">
          <Spin />
        </div>
        <div className="upload-title">
          <img src={iconUpload} alt="" />
          <span>{file.slug}</span>
        </div>
        {skipButton && (
          <button
            className="upload-skip"
            onClick={(e) => {
              setLoading(true);
              const updateFile = { ...file };
              if (file.is_skipped === 0) {
                e.preventDefault();
                e.stopPropagation();
                setSkipFile(id, file.id).then((data) => {
                  onAction(data.document);
                });
              }
              setLoading(false);
            }}>
            {file.is_skipped ? (
              <>
                <img src={iconUndo} alt={iconUndo} />
                <span>Upload</span>
              </>
            ) : (
              <>
                <img src={iconSkip} alt="" />
                <span>Skip</span>
              </>
            )}
          </button>
        )}
        {!skipButton && (
          <div className="upload-status">
            <img src={iconUploadRed} alt="" />
            <span>Not uploaded</span>
          </div>
        )}
      </Dragger>
    </Tooltip>
  );
};

export default AdminUploadFile;
