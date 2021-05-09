import React from "react";
import { Button, Row, Col, Card } from "antd";
import { useSelector } from "react-redux";

import "./style.scss";

const Сonfirm = ({ goNextStep, goPrevStep }) => {
  const state = useSelector((state) => state.registration);
  return (
    <div className='welcome__comfirm'>
      <h1>
        Please confirm information to proceed to official service agreement
      </h1>
      {/* <div className='hello-page__description'>
        Thank you for signing up to work with Granter or your next R&D tax
        credit claim. We are excited to be working with you in the future.
      </div> */}
      <div className='welcome__comfirm_info'>
        <Row gutter={24}>
          <Col span={8}>
            <Card>
              <p>{state.name}</p>
              <span>Company name</span>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <p>{state.number}</p>
              <span>Company numbner</span>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              {state.industry.length > 0 &&
                state.industry.map((item, index) => (
                  <p key={`ind-${index}`}>
                    {item.sic_code} - {item.display_value}
                  </p>
                ))}
              <span>Industry</span>
            </Card>
          </Col>
        </Row>
      </div>
      <div className='welcome__comfirm_submit'>
        <Button type='primary' onClick={goNextStep}>
          Confirm
        </Button>
        <Button type='text' onClick={goPrevStep}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default Сonfirm;
