import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Upload, Select, Button, Spin, Skeleton, Tooltip, Input } from 'antd';

import { getDocumentComments, postNewVersionDocument, postNewComment, removeComment } from '../../core/services';

import DocumentViewer from '../../components/DocumentViewer';
import Comment from '../../components/Comment';
import { IconComment } from '../../components/icons';

import iconBack from '../../assets/img/arrow-left.svg';
import iconDownload from '../../assets/img/icon-download.svg';
import iconUpload from '../../assets/img/icon-upload-blue.svg';
import iconSelectArrow from '../../assets/img/iceon-select-arrow.svg';

import './style.scss';

const { Dragger } = Upload;
const { Option } = Select;

const DocumentPage = () => {
  const { id, climeId } = useParams();
  const [commentsList, setCommentsList] = useState(null);
  const [mode, setMode] = useState('all');
  const [document, setDocument] = useState(null);
  const [documentUploadLoader, setDocumentUploadLoader] = useState(false);
  const [newCommentForm, setNewCommentForm] = useState(false);
  const [newCommentLoader, setNewCommentLoader] = useState(false);
  const history = useHistory();

  useEffect(() => {
    getDocumentComments(climeId, id, history).then((data) => {
      console.log(data);
      setCommentsList(data.comments);
      setDocument(data.document);
    });
  }, [climeId, id]);

  const onChangeMode = (e) => {
    const result = [...commentsList];
    if (e === 'latest') {
      result.sort((a, b) => (a.updated_at > b.updated_at ? -1 : b.updated_at > a.updated_at ? 1 : 0));
    } else {
      result.sort((a, b) => (a.updated_at > b.updated_at ? 1 : b.updated_at > a.updated_at ? -1 : 0));
    }
    setCommentsList(result);
    setMode(e);
  };

  const uploadNewDocument = ({ file }) => {
    setDocumentUploadLoader(true);
    postNewVersionDocument(climeId, id, file).then((data) => {
      setDocument(data.document);
      setDocumentUploadLoader(false);
    });
  };

  const addComment = (e) => {
    const value = e.currentTarget.value;
    if (e.shiftKey || value.trim().length === 0) return;
    setNewCommentLoader(true);
    postNewComment(climeId, id, value).then((data) => {
      const result = [...data.comment];
      if (mode === 'latest') {
        result.sort((a, b) => (a.updated_at > b.updated_at ? -1 : b.updated_at > a.updated_at ? 1 : 0));
      }
      setCommentsList(result);
      setNewCommentLoader(false);
      setNewCommentForm(false);
      if (mode === 'latest') {
        setTimeout(() => {
          window.document.querySelector('.document-details__comments_list').scrollTo(0, 0);
        }, 100);
      }
    });
  };

  const addReply = (e, comment_id) => {
    const value = e.currentTarget.value;
    return new Promise((resolve, reject) => {
      postNewComment(climeId, id, value, 1, comment_id).then((data) => {
        setCommentsList(data.comment);
        resolve();
      });
    });
  };

  const onCommentDelete = (commentId) => {
    removeComment(climeId, id, commentId).then((data) => {
      setCommentsList(data.comments);
      // setLoading(false);
      // onAction(data.document);
    });
  };

  const isCommentsApproved = () => {
    console.log('commentsList', commentsList);
    return commentsList.filter((item) => item.status === 1).length > 0;
    //return true;
  };

  return (
    <div className="document-details">
      <div className="document-details__viewer">
        <header className="document-details__header">
          <Link to="/active-claims/" className="header--back">
            <img src={iconBack} alt="" />
            <span>To Dashboard</span>
          </Link>
          {document && (
            <>
              <a href={document.url} className="header--download">
                <img src={iconDownload} alt="" />
                <span>Download File</span>
              </a>
              <Dragger
                className="header--upload"
                disabled={isCommentsApproved()}
                name="file"
                customRequest={uploadNewDocument}
                accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                showUploadList={false}>
                {documentUploadLoader && (
                  <div className="loading">
                    <Spin />
                  </div>
                )}
                {isCommentsApproved() ? (
                  <Tooltip
                    placement="bottom"
                    title="You cannot update this file because it contains an unresolved comment.">
                    <div>
                      <img src={iconUpload} alt="" />
                      <span>Upload New Version</span>
                    </div>
                  </Tooltip>
                ) : (
                  <div>
                    <img src={iconUpload} alt="" />
                    <span>Upload New Version</span>
                  </div>
                )}
              </Dragger>
            </>
          )}
        </header>
        <article className="document-wrapper">{document && <DocumentViewer url={document.url} />}</article>
      </div>
      <div className="document-details__comments">
        {!commentsList ? (
          <Skeleton active />
        ) : (
          <>
            <div className="document-details__comments_header">
              <div className="header--title">
                <IconComment />
                <span>Comments ({commentsList.length})</span>
              </div>
              {commentsList.length > 0 && (
                <Select
                  defaultValue="all"
                  suffixIcon={<img src={iconSelectArrow} alt="" />}
                  dropdownMatchSelectWidth={false}
                  onChange={onChangeMode}>
                  <Option value="all">All</Option>
                  <Option value="latest">Latest</Option>
                </Select>
              )}
            </div>
            <div className="document-details__comments_list">
              {commentsList.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  climeId={climeId}
                  onCommentDelete={onCommentDelete}
                  onAddReply={addReply}
                />
              ))}
              {newCommentForm && (
                <div className="new-comment">
                  {!newCommentLoader ? (
                    <>
                      <label>Comment:</label>
                      <Input.TextArea placeholder="Type to Comment, Enter to Send" onPressEnter={addComment} />
                    </>
                  ) : (
                    <Skeleton active />
                  )}
                </div>
              )}
            </div>
          </>
        )}
        <div className="document-details__comments_new">
          <Button
            type="primary"
            disabled={newCommentForm}
            onClick={(e) => {
              setNewCommentForm(true);
              setTimeout(() => {
                window.document.querySelector('.document-details__comments_list').scrollTo(0, 50000);
              }, 100);
            }}>
            New Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentPage;
