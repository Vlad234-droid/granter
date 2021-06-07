import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Input, Row, Col } from 'antd';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../../core/actions';
import './style.scss';

const WelcomeStep3 = ({ goNextStep, goPrevStep, setMinPrice, setMaxPrice }) => {
  const hight = useRef({
    hightPersent: '',
  });
  const dispatch = useDispatch();
  const { industry } = useSelector((state) => state?.registration);
  const { registrationUpdateState, registrationChangeEstimate } = bindActionCreators(actions, dispatch);

  const checkForHighestPercent = () => {
    const check = industry.map((item) => {
      if (item.percent >= 0) {
        return item.percent;
      }
    });
    if (Math.max(...check) > 0) {
      hight.current.hightPersent = Math.max(...check);
      return true;
    } else {
      return false;
    }
  };

  const setToBenefitPriceHandler = (values) => {
    const { staffing_costs, materials_costs, subcontracting_costs, software_costs } = values;

    const estimated_benefit =
      (Number(staffing_costs) + Number(materials_costs) + Number(subcontracting_costs) + Number(software_costs)) *
      0.25 *
      (Number(hight.current.hightPersent) / 100);
    setMinPrice(() => Math.floor(estimated_benefit * 0.8));
    setMaxPrice(() => Math.floor(estimated_benefit * 1.2));
  };

  const onFinishName = (values) => {
    registrationUpdateState(values);
    if (checkForHighestPercent()) {
      setToBenefitPriceHandler(values);
      registrationChangeEstimate('benefit');
    } else {
      registrationChangeEstimate('estimate');
    }
    goNextStep();
  };

  return (
    <div className="hello-page__step">
      <div className="step--grid">
        <Form
          layout="vertical"
          requiredMark={false}
          onFinish={onFinishName}
          // onFinishFailed={onFinishFailed}
        >
          <Row gutter={56}>
            <Col className="gutter-row" span={12}>
              <Form.Item
                label="What are your approximate internal staffing costs per year?"
                name="staffing_costs"
                rules={[
                  {
                    required: true,
                    message: 'Please select your approximate internal staffing costs!',
                  },
                ]}>
                <Input placeholder="Enter the number" type="number" suffix="£" />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item
                label="What are your approximate consumed materials costs per year?"
                name="materials_costs"
                rules={[
                  {
                    required: true,
                    message: 'Please select your approximate consumed materials costs!',
                  },
                ]}>
                <Input placeholder="Enter the number" type="number" suffix="£" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={56}>
            <Col className="gutter-row" span={12}>
              <Form.Item
                label="What are your approximate subcontracting costs per year?"
                name="subcontracting_costs"
                rules={[
                  {
                    required: true,
                    message: 'Please select your approximate subcontracting costs!',
                  },
                ]}>
                <Input placeholder="Enter the number" type="number" suffix="£" />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item
                label="What are your approximate software costs per year?"
                name="software_costs"
                rules={[
                  {
                    required: true,
                    message: 'Please select your approximate software costs!',
                  },
                ]}>
                <Input placeholder="Enter the number" type="number" suffix="£" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="control-submit">
            <Button type="primary" htmlType="submit">
              Next
            </Button>
            <Button
              type="text"
              onClick={() => {
                goPrevStep();
              }}>
              Back
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default WelcomeStep3;
