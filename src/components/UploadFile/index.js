import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip, Upload, Dropdown, Button, Spin } from 'antd';
import { setSkipFile, uploadFile, deleteFile } from '../../core/services';

import iconUpload from '../../assets/img/icon-upload.svg';
import iconUploadRed from '../../assets/img/icon-upload-red.svg';
import iconSkip from '../../assets/img/icon-skip.svg';
import iconUndo from '../../assets/img/icon-undo.svg';
import iconPdf from '../../assets/img/icon-pdf.svg';
import iconComment from '../../assets/img/icon-comment.svg';
import actions from '../../core/actions';
import PDFSVG from '../../assets/img/PDF.svg';
import XLSXSVG from '../../assets/img/XLSX.svg';
import DOCSSVG from '../../assets/img/DOCS.svg';

import { IconDeleteFile } from '../icons';

import './style.scss';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

const { Dragger } = Upload;
const { REACT_APP_API_URL } = process.env;

const UploadFile = ({ detailsShow, skipButton, file, removeButton, onRed, onAction }) => {
  const [onRemoveDropdown, setOnRemoveDropdown] = useState(false);
  const [extension, setExtension] = useState(null);
  const [loading, setLoading] = useState(false);
  const activeClaimId = useSelector((state) => state.user.activeClaimId);
  const dispatch = useDispatch();

  const { blurActiveSteps } = bindActionCreators(actions, dispatch);

  useEffect(() => {
    if (file.url) {
      setExtension(file.url.match(/\.[0-9a-z]+$/i)[0]);
    }
  }, [file]);

  const customRequest = (e) => {
    setLoading(true);
    uploadFile(activeClaimId, file.id, e.file).then((data) => {
      const res = data.document;
      res.extension = res.extension || res.url.match(/\.[0-9a-z]+$/i)[0];
      res.comments_count = res.comments_count || 0;
      onAction(res);
      setLoading(false);
    });
    e.onSuccess('ok');
  };

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

  if (file.status > 1 && file.is_skipped < 1)
    return (
      <div className={`step-file ${loading ? 'loading' : ''}`}>
        <div className="step-file-loading">
          <Spin />
        </div>
        <div className="step-file--title">
          <img src={checkForExt(extension)} alt="extension" />
          <Link
            to={`/document/${file.claim_id}/${file.id}/`}
            onClick={() => {
              if (detailsShow) blurActiveSteps();
            }}>
            {file.name}
          </Link>
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
                  className="step-file--remove-button"
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
        <div className="step-file--status">
          <div className={`status ${statusName(file.status).class}`}>{statusName(file.status).name}</div>
          <div className="comments">
            <img src={iconComment} alt="" />
            <span>{file.comments_count}</span>
          </div>
        </div>
      </div>
    );

  return (
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
                setSkipFile(activeClaimId, file.id).then((data) => {
                  onAction(data.document);
                });
              }
              setLoading(false);
            }}>
            {file.is_skipped ? (
              <>
                <img src={iconUndo} alt="" />
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

export default UploadFile;
