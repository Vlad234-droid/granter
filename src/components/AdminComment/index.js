import React, { useState, useEffect } from 'react';
import { Checkbox, Input, Collapse, Dropdown, Button, Skeleton } from 'antd';

import { approveComment, unApproveComment } from '../../core/adminServices';

import Reply from './Reply';
import arrow from '../../assets/img/icon-arrow-dropdown.svg';

import { IconDeleteFile, IconReply } from '../icons';

import './style.scss';

const { Panel } = Collapse;

const AdminComment = ({ comment, onCommentDelete, onAddReply }) => {
  const [onRemoveDropdown, setOnRemoveDropdown] = useState(false);
  const [status, setStatus] = useState(null);

  const [replyForm, setReplyForm] = useState(false);
  const [replyLoader, setReplyLoader] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStatus(comment.status > 1 ? true : false);
  }, []);

  const onDelete = () => {
    setLoading(true);
    onCommentDelete(comment.id);
  };

  const onAprove = (e) => {
    if (e.target.checked) {
      approveComment(comment.id);
    } else {
      unApproveComment(comment.id);
    }
    setStatus(e.target.checked);
  };

  const convertDate = (date) => {
    function convertDate(inputFormat) {
      function pad(s) {
        return s < 10 ? '0' + s : s;
      }
      var d = new Date(inputFormat);
      return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
    }
    return convertDate(date);
  };

  return (
    <div className={`comment ${onRemoveDropdown ? 'red' : ''}`}>
      <div className="comment__section">
        <div className="comment--header">
          <div className="comment--author">
            <div className="comment--author-info">
              <span title={comment.user}>{comment.user}</span>
              <time>{convertDate(comment.updated_at)}</time>
            </div>
          </div>
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
                <div className="dropdown-title">Are you sure you want to delete this Comment?</div>
                <div className="dropdown-actions">
                  <Button
                    type="button"
                    onClick={(e) => {
                      setOnRemoveDropdown(false);
                      // onRed(false);
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
              className="step-file--remove"
              onClick={() => {
                setOnRemoveDropdown(true);
              }}>
              <IconDeleteFile />
            </button>
          </Dropdown>
          <button
            onClick={(e) => {
              setReplyForm(true);
            }}>
            <IconReply />
          </button>
          <Checkbox checked={status} className="reply-checkbox" onChange={onAprove} />
        </div>
        <div
          style={{ whiteSpace: 'normal' }}
          className="comment--message"
          escape="false"
          dangerouslySetInnerHTML={{
            __html: `${comment.text.replace(/(?:\r\n|\r|\n)/g, '<br>')}`,
          }}
        />
      </div>
      {replyForm && (
        <div className="comment__reply">
          {!replyLoader ? (
            <>
              <div className="comment__reply_title">Reply:</div>
              <Input.TextArea
                placeholder="Type to Reply, Enter to Send"
                onPressEnter={(e) => {
                  const value = e.currentTarget.value;
                  if (e.shiftKey || value.trim().length === 0) return;
                  setReplyLoader(true);
                  onAddReply(e, comment.id).then(() => {
                    setReplyForm(false);
                    setReplyLoader(false);
                  });
                }}
              />
            </>
          ) : (
            <Skeleton active />
          )}
        </div>
      )}
      {comment.replies.length > 0 && (
        <Collapse bordered={false} ghost={true} expandIcon={() => <img src={arrow} alt={arrow} />}>
          <Panel header={`Replies (${comment.replies.length})`} key="1">
            {comment.replies.map((item, index) => (
              <Reply
                key={`reply-${item.id}`}
                reply={item}
                onReplyDelete={(id) => {
                  onCommentDelete(id);
                }}
              />
            ))}
          </Panel>
        </Collapse>
      )}
    </div>
  );
};

export default AdminComment;
