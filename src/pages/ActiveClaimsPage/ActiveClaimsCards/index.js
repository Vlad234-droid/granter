import React from "react";
import { Row, Col, Card, Progress } from "antd";

import "./style.scss";

const ActiveClaimsCards = () => {
  return (
    <div className='active-claims__cards'>
      <Row gutter={16}>
        <Col span={6}>
          <Card title='Estimated total claim benefit'>
            <div className='different'>£2,000 - £5,000</div>
            <ul className='claims'>
              <li>
                YoY Change:
                <span className='statistics up'>13%</span>
              </li>
              <li>
                Claim 1 - 2019:
                <b>£2,000 - £5,000 </b>
                <span className='statistics down'>13%</span>
              </li>
            </ul>
          </Card>
        </Col>
        <Col span={6}>
          <Card title='Estimated total claim benefit'>
            <div className='clime-progress'>
              <Progress
                type='circle'
                percent={30}
                width={72}
                strokeColor='#F9A648'
              />
              <div className='clime-progress--info'>
                <span>Days since start</span>
                <b>12 days</b>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card title='Project Claim Completion'>
            <div className='info'>
              <b>15 days</b>
              <span>22/01/2021</span>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card title='Project Benefit Payment'>
            <div className='info'>
              <b>45 days</b>
              <span>22/01/2021</span>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ActiveClaimsCards;
