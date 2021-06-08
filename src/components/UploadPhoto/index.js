import React from 'react';
import { Tooltip, Upload, Dropdown, Button, Spin } from 'antd';
import iconUpload from '../../assets/img/icon-upload.svg';
import { EditPhotoAdmin } from '../../components/icons';

import './style.scss';

const { Dragger } = Upload;

const UploadPhoto = ({ form, edit, setEdit, avatarUrl, setAvatarUrl }) => {
  const customRequest = (e) => {
    form.setFieldsValue({
      avatar: e.file,
    });
    setAvatarUrl(() => URL.createObjectURL(e.file));
    e.onSuccess('ok');
    setEdit(() => true);
  };

  if (edit) {
    return (
      <div className="edit_dragger">
        <Dragger
          name="file"
          customRequest={customRequest}
          accept=".jpg,.jpeg,.png"
          className={`upload-file--edit ${false ? 'loading' : ''} `}
          showUploadList={false}>
          <div className="wrapper">
            <div className="edit_avatar">
              <img src={avatarUrl !== null ? avatarUrl : ''} alt="avatar" />
            </div>
            <EditPhotoAdmin />
          </div>
        </Dragger>
      </div>
    );
  }
  return (
    <Tooltip placement="rightTop" title={'Upload PNG, JPG, JPEG'}>
      <Dragger
        name="file"
        customRequest={customRequest}
        accept=".jpg,.jpeg,.png"
        className={`upload-file ${false ? 'loading' : ''} `}
        showUploadList={false}>
        <div className="upload-loading">
          <Spin />
        </div>
        <div className="upload-title">
          <img src={iconUpload} alt="iconUpload" />
          <span className="upload_photo">Upload Photo</span>
          <span className="upload_only">upload png or jpeg</span>
        </div>
      </Dragger>
    </Tooltip>
  );
};

export default UploadPhoto;
