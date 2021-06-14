import React, { useState } from 'react';
import { Checkbox, Dropdown, Button } from 'antd';

import { IconDeleteFile } from '../../icons';

import './style.scss';

const Reply = ({ reply, onReplyDelete }) => {
  const [onRemoveDropdown, setOnRemoveDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true);
    onReplyDelete(reply.id);
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
    <div className={`comment__section ${onRemoveDropdown ? 'red' : ''}`}>
      <div className="comment--header">
        <div className="comment--author">
          <div className="comment--author-info">
            <span>{reply.user}</span>
            <time>{convertDate(reply.updated_at)}</time>
          </div>
        </div>
        <Dropdown
          placement="bottomRight"
          trigger="click"
          visible={onRemoveDropdown}
          onVisibleChange={(visible) => {
            if (!visible) setOnRemoveDropdown(false);
          }}
          overlay={
            <div className="step-file--title-dropdown">
              <div className="dropdown-title">Are you sure you want to delete this Reply?</div>
              <div className="dropdown-actions">
                <Button
                  type="button"
                  onClick={() => {
                    setOnRemoveDropdown(false);
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
        {/* <Checkbox className="reply-checkbox" /> */}
      </div>
      <div
        className="comment--message"
        dangerouslySetInnerHTML={{
          __html: reply.text.replace(/(?:\r\n|\r|\n)/g, '<br>'),
        }}
      />
    </div>
  );
};

export default Reply;
