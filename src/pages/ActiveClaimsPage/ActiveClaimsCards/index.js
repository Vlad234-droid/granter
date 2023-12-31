import React, { useCallback } from 'react';
import { Row, Col, Card, Progress } from 'antd';
import './style.scss';
import { useSelector } from 'react-redux';

const ActiveClaimsCards = ({ activeClaimData }) => {
  const { activeClaimStatus } = useSelector((state) => state.claims);
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

  const getTitle = useCallback(() => {
    if (Object.values(activeClaimStatus).every((item) => item)) return 'Total claim benefit';
    return 'Estimated total claim benefit';
  }, [activeClaimStatus]);

  return (
    <div className="active-claims__cards">
      <Row gutter={16}>
        <Col span={6}>
          <Card title={getTitle()}>
            <div className="different">
              £{Number(activeClaimData.estimated_benefit_start).toFixed()} - £
              {Number(activeClaimData.estimated_benefit_end).toFixed()}
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Total claim progress">
            <div className="clime-progress">
              <Progress
                type="circle"
                percent={Math.round(activeClaimData.estimated_total_claim_benefit_percentage * 100)}
                width={72}
              />
              {/* To set the status of the Progress, options: success exception normal active(line only) */}
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
          <Card title="Estimated Claim Submission">
            <div className="info">
              <b>
                {activeClaimData.estimated_claim_completion}{' '}
                {activeClaimData.estimated_claim_completion > 1 ? 'days' : 'day'}
              </b>
              <span>{convertDate(activeClaimData.created_at, activeClaimData.estimated_claim_completion)}</span>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Estimated Benefit Payment">
            <div className="info">
              <b>
                {activeClaimData.estimated_claim_completion + activeClaimData.estimated_completion}{' '}
                {activeClaimData.estimated_claim_completion + activeClaimData.estimated_completion > 1 ? 'days' : 'day'}
              </b>
              <span>
                {convertDate(
                  activeClaimData.created_at,
                  activeClaimData.estimated_claim_completion + activeClaimData.estimated_completion,
                )}
              </span>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ActiveClaimsCards;
