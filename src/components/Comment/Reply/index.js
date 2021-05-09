import React, { useState } from "react";
import { Checkbox, Input, Collapse, Dropdown, Button } from "antd";

import { IconDeleteFile, IconReply } from "../../icons";
import authorPhoto from "../../../assets/img/author.png";

import "./style.scss";

const Reply = (comment) => {
  const [onRemoveDropdown, setOnRemoveDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    // setLoading(true);
    // setOnRemoveDropdown(false);
    // deleteFile(activeClaimId, file.id).then((data) => {
    //   setLoading(false);
    //   onAction(data.document);
    //   console.log(data);
    // });
  };

  return (
    <div className={`comment__section ${onRemoveDropdown ? "red" : ""}`}>
      <div className='comment--header'>
        <div className='comment--author'>
          <div className='comment--author-photo'>
            <img src={authorPhoto} alt='' />
          </div>
          <div className='comment--author-info'>
            <span>Michael Sho </span>
            <time>20/08/2020</time>
          </div>
        </div>
        <Dropdown
          placement='bottomRight'
          trigger='click'
          visible={onRemoveDropdown}
          onVisibleChange={(visible) => {
            if (!visible) setOnRemoveDropdown(false);
            // onRed(visible);
          }}
          overlay={
            <div className='step-file--title-dropdown'>
              <div className='dropdown-title'>
                Are you sure you want to delete this Document?
              </div>
              <div className='dropdown-actions'>
                <Button
                  type='button'
                  onClick={(e) => {
                    setOnRemoveDropdown(false);
                    // onRed(false);
                  }}
                >
                  Back
                </Button>
                <Button type='primary' onClick={onDelete} loading={loading}>
                  Delete
                </Button>
              </div>
            </div>
          }
        >
          <button
            className='step-file--remove'
            onClick={() => {
              setOnRemoveDropdown(true);
            }}
          >
            <IconDeleteFile />
          </button>
        </Dropdown>
        <Checkbox className='reply-checkbox' />
      </div>
      <div className='comment--message'>
        Please, add the information means a defect, error or bug in the Software
        having [an adverse effect] OR [a material adverse effect] on [the
        appearance, operation, functionality or performance of the Software][,
        but excluding any defect, error or bug caused by or arising as a result
        of:
      </div>
    </div>
  );
};

export default Reply;
