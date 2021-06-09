import React, { useEffect, useState } from 'react';
import { Skeleton, Form, Input, Button } from 'antd';

import { editClaimData } from '../../../core/adminServices';
import { IconEditPencil } from '../../../components/icons';

const AdminActiveClaimsDates = ({ activeClaimData }) => {
  const [startDate, setStartDate] = useState(activeClaimData.start_date);
  const [endDate, setEndDate] = useState(activeClaimData.end_date);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFinish = (valuse) => {
    setLoading(true);
    editClaimData(activeClaimData.id, valuse).then(() => {
      setStartDate(valuse.start_date);
      setEndDate(valuse.end_date);
      setLoading(false);
      setEditMode(false);
    });
  };

  return (
    <div className="admin-claims__dates">
      {!editMode ? (
        <div className="admin-claims__dates_info">
          <span>
            {startDate} - {endDate}
          </span>
          <button
            type="button"
            onClick={() => {
              setEditMode(true);
            }}>
            <IconEditPencil />
          </button>
        </div>
      ) : (
        <div className="admin-claims__dates_form">
          <Form
            name="basic"
            className="active-claims__dates_form"
            initialValues={{
              start_date: activeClaimData.start_date,
              end_date: activeClaimData.end_date,
            }}
            onFinish={onFinish}>
            <Form.Item
              name="start_date"
              rules={[
                {
                  required: true,
                  message: 'Please input your estimated benefit!',
                },
              ]}>
              <Input placeholder="Start date" />
            </Form.Item>
            <div className="devider">-</div>
            <Form.Item
              name="end_date"
              rules={[
                {
                  required: true,
                  message: 'Please input your estimated benefit!',
                },
              ]}>
              <Input placeholder="End date" />
            </Form.Item>
            <div className="active-claims__dates_form-actions">
              <Button
                type="button"
                onClick={() => {
                  setEditMode(false);
                }}>
                Cancel
              </Button>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Save
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default AdminActiveClaimsDates;
