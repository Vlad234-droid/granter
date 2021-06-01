import React, { useMemo } from 'react';
import { Form, Button, Input, Row, Col } from 'antd';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../../core/actions';
import { getEstimate } from '../../../../core/services/getEstimate';

import './style.scss';

const WelcomeStep3 = ({ goNextStep, goPrevStep }) => {
  const dispatch = useDispatch();
  const { industry } = useSelector((state) => state?.registration);
  const { registrationUpdateState, registrationChangeEstimate } = bindActionCreators(actions, dispatch);

  const Ids = useMemo(() => {
    const filterId = industry[0]?.id;
    const idArr = [];
    if (filterId !== null) idArr.push(filterId);
    return idArr;
  }, [industry]);

  const onFinishName = (values) => {
    registrationUpdateState(values);
    if (!!industry[0]?.percent) {
      getEstimate(Ids, values).then((res) => {
        if (res.ok) {
          registrationChangeEstimate('estimate');
        }
      });
    } else {
      registrationChangeEstimate('benefit');
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
