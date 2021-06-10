import React from 'react';
import { Modal, Button } from 'antd';
import './style.scss';
import { CloseIconModal } from '../../../components/icons';
import { deleteAdmin } from '../../../core/adminServices/settingsServices';
import actions from '../../../core/actions';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';

const DeleteAdminModal = ({
  setRecordId,
  recordId,
  filteredListAdmins,
  setDataTable,
  isDeleteAdminModal,
  setIsDeleteAdminModal,
  setFilteredListAdmins,
}) => {
  const dispatch = useDispatch();
  const { setIsBlur } = bindActionCreators(actions, dispatch);

  const deleteAdminHandler = () => {
    deleteAdmin(recordId).then((data) => {
      if (data.success) {
        setDataTable(() => filteredListAdmins);
        setRecordId(() => '');
        setFilteredListAdmins(() => []);
        setIsDeleteAdminModal(false);
        setIsBlur(false);
      }
    });
  };
  return (
    <Modal
      title="Basic Modal"
      className="delete-admin__modal"
      visible={isDeleteAdminModal}
      width={700}
      onCancel={() => {
        setIsBlur(false);
        setIsDeleteAdminModal(false);
      }}
      footer={false}
      title={false}
      closeIcon={<CloseIconModal />}>
      <h2>
        Are you sure you want <br />
        to delete admin?
      </h2>
      <div className="delete-client__modal_actions">
        <Button
          type="button"
          onClick={() => {
            setIsDeleteAdminModal(() => false);
            setIsBlur(false);
          }}>
          Back
        </Button>
        <Button type="primary" onClick={deleteAdminHandler}>
          Delete
        </Button>
      </div>
    </Modal>
  );
};
export default DeleteAdminModal;
