import React, { useRef } from 'react';
import { Form, Button, Input, Row, Col } from 'antd';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../../core/actions';

import { firstRow, secondRow } from './config';

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
    if (Object.values(values).every((item) => item === undefined)) {
      registrationChangeEstimate('estimate');
      goNextStep();
      return;
    }

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
    <div className="hello-page__step costs">
      <h3 className="costs--title">What are your approximate costs for the following?</h3>
      <div className="step--grid">
        <Form
          layout="vertical"
          requiredMark={false}
          onFinish={onFinishName}
          // onFinishFailed={onFinishFailed}
        >
          <Row gutter={56}>
            {firstRow.map((item) => (
              <Col key={item.name} className="gutter-row" span={12}>
                <Form.Item label={item.label} name={item.name} rules={item.rules}>
                  <Input placeholder={item.placeholder} type={item.type} suffix={item.suffix} />
                </Form.Item>
              </Col>
            ))}
          </Row>
          <Row gutter={56}>
            {secondRow.map((item) => (
              <Col key={item.name} className="gutter-row" span={12}>
                <Form.Item label={item.label} name={item.name} rules={item.rules}>
                  <Input placeholder={item.placeholder} type={item.type} suffix={item.suffix} />
                </Form.Item>
              </Col>
            ))}
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
