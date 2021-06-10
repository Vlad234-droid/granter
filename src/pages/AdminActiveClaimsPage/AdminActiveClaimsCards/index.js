import React, { useState } from 'react';
import { Row, Col, Card, Progress, Input, Form, Button } from 'antd';

import { editClaimCards } from '../../../core/adminServices';
import { IconEditPencil } from '../../../components/icons';

import './style.scss';

const AdminActiveClaimsCards = ({ activeClaimData, onEdit }) => {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const convertDate = (date, days) => {
    function convertDate(inputFormat) {
      function pad(s) {
        return s < 10 ? '0' + s : s;
      }
      var d = new Date(inputFormat);
      return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
    }
    var newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return convertDate(newDate);
  };

  const onFinish = (valuse) => {
    setLoading(true);
    editClaimCards(activeClaimData.id, valuse).then(() => {
      onEdit();
      setLoading(false);
      setEditMode(false);
    });
  };

  return (
    <Form
      name="basic"
      className="active-claims__cards_form"
      initialValues={{
        estimated_benefit: activeClaimData.estimated_benefit,
        estimated_claim_completion: activeClaimData.estimated_claim_completion,
        project_claim_completion: activeClaimData.estimated_completion,
      }}
      onFinish={onFinish}>
      <div className="active-claims__cards">
        <button
          type="button"
          className="active-claims__cards_edit"
          onClick={() => {
            setEditMode(true);
          }}>
          {editMode ? (
            <span>Claim</span>
          ) : (
            <>
              <IconEditPencil />
              <span>Edit Claims</span>
            </>
          )}
        </button>
        <Row gutter={16}>
          <Col span={6}>
            <Card title="Estimated total claim benefit">
              {!editMode && (
                <div className="different">
                  £{Number(activeClaimData.estimated_benefit_start).toFixed()} - £
                  {Number(activeClaimData.estimated_benefit_end).toFixed()}
                </div>
              )}
              <div className="edit">
                <Form.Item
                  name="estimated_benefit"
                  hidden={!editMode}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your estimated benefit!',
                    },
                  ]}>
                  <Input type="number" prefix="£" />
                </Form.Item>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Estimated total claim benefit">
              <div className="clime-progress">
                <Progress
                  type="circle"
                  percent={Math.round(activeClaimData.estimated_total_claim_benefit_percentage * 100)}
                  width={72}
                  strokeColor="#F9A648"
                />
                <div className="clime-progress--info">
                  <span>Days since start</span>
                  <b>
                    {activeClaimData.estimated_total_claim_benefit_days}{' '}
                    {activeClaimData.estimated_total_claim_benefit_days > 1 ? 'days' : 'day'}
                  </b>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Project Claim Completion">
              {!editMode && (
                <div className="info">
                  <b>
                    {activeClaimData.estimated_claim_completion}{' '}
                    {activeClaimData.estimated_claim_completion > 1 ? 'days' : 'day'}
                  </b>
                  <span>{convertDate(activeClaimData.created_at, activeClaimData.estimated_claim_completion)}</span>
                </div>
              )}
              <div className="edit">
                <Form.Item
                  name="estimated_claim_completion"
                  hidden={!editMode}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your estimated claim completion!',
                    },
                  ]}>
                  <Input type="number" suffix="days" />
                </Form.Item>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Project Benefit Payment">
              {!editMode && (
                <div className="info">
                  <b>
                    {activeClaimData.estimated_completion} {activeClaimData.estimated_completion > 1 ? 'days' : 'day'}
                  </b>
                  <span>{convertDate(activeClaimData.created_at, activeClaimData.estimated_completion)}</span>
                </div>
              )}
              <div className="edit">
                <Form.Item
                  name="project_claim_completion"
                  hidden={!editMode}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your project benefit payment!',
                    },
                  ]}>
                  <Input type="number" suffix="days" />
                </Form.Item>
              </div>
            </Card>
          </Col>
        </Row>
        {editMode && (
          <div className="active-claims__cards_form-actions">
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
        )}
      </div>
    </Form>
  );
};

export default AdminActiveClaimsCards;
