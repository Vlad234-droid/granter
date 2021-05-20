import React from 'react';
import { Modal, Button } from 'antd';

import { CloseIconModal } from '../../../components/icons';

import './style.scss';

const OnDeleteModal = ({ visible, onClose }) => {
  return (
    <Modal
      className="documents-remove-modal"
      title={false}
      footer={false}
      visible={visible}
      width={700}
      onCancel={onClose}
      closeIcon={<CloseIconModal />}>
      <h2>Are you sure you want to delete this Documents?</h2>
      <div className="documents-remove-modal__text">If you delete - you cannot get it back.</div>
      <div className="documents-remove-modal__actions">
        <Button type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button type="primary" danger>
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default OnDeleteModal;
