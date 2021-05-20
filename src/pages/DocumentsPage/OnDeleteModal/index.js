import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { Link } from 'react-router-dom';

import { CloseIconModal } from '../../../components/icons';

import iconPdf from '../../../assets/img/icon-pdf.svg';

import './style.scss';

const OnDeleteModal = ({ visible, onClose, deleteList, onDeleteFile }) => {
  useEffect(() => {
    console.log('deleteList', deleteList);
  }, [deleteList]);

  const onDeleteList = () => {
    deleteList.forEach((item) => {
      if (!item.has_unresolved_comments) {
        onDeleteFile(item.claim_id, item.id);
        onClose();
      }
    });
  };

  return (
    <Modal
      className="documents-remove-modal"
      title={false}
      footer={false}
      visible={visible}
      width={700}
      onCancel={onClose}
      closeIcon={<CloseIconModal />}>
      {deleteList.filter((item) => item.has_unresolved_comments).length ? (
        <>
          <h2>Unfortunately, you can't delete this file(s)</h2>
          <div className="documents-remove-modal__text">
            The following files cannot be deleted because it contains an{' '}
            <b>unresolved comments. Please, contact your manager to discuss the comments</b>
          </div>
          <ul className="documents-remove-modal__list">
            {deleteList
              .filter((item) => item.has_unresolved_comments)
              .map((item) => (
                <li key={`delete-file-${item.id}`}>
                  <img src={iconPdf} alt="" />
                  <span>{item.original_name}</span>
                </li>
              ))}
          </ul>
          <div className="documents-remove-modal__actions">
            <Button type="button" onClick={onClose}>
              Back
            </Button>
            <Button type="primary" onClick={onDeleteList} danger>
              Delete the rest
            </Button>
          </div>
        </>
      ) : (
        <>
      <h2>Are you sure you want to delete this Documents?</h2>
      <div className="documents-remove-modal__actions">
        <Button type="button" onClick={onClose}>
          Cancel
        </Button>
            <Button type="primary" onClick={onDeleteList} danger>
          Delete
        </Button>
      </div>
        </>
      )}
    </Modal>
  );
};

export default OnDeleteModal;
