import React, { useEffect, useRef } from "react";
import { Form, Carousel, Button, Input, Select, Row, Col } from "antd";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import actions from "../../../../core/actions";

import "./style.scss";

const WelcomeStep3 = ({ goNextStep, goPrevStep }) => {
  const dispatch = useDispatch();
  const { registrationUpdateState } = bindActionCreators(actions, dispatch);

  const onFinishName = (values) => {
    registrationUpdateState(values);
    goNextStep();
  };

  return (
    <div className='hello-page__step'>
      <div className='step--grid'>
        <Form
          layout='vertical'
          requiredMark={false}
          onFinish={onFinishName}
          // onFinishFailed={onFinishFailed}
        >
          <Row gutter={56}>
            <Col className='gutter-row' span={12}>
              <Form.Item
                label='What are your approximate internal staffing costs per year?'
                name='staffing_costs'
                rules={[
                  {
                    required: true,
                    message:
                      "Please select your approximate internal staffing costs!",
                  },
                ]}
              >
                <Input placeholder='Enter the number' type='number' />
              </Form.Item>
            </Col>
            <Col className='gutter-row' span={12}>
              <Form.Item
                label='What are your approximate consumed materials costs per year?'
                name='materials_costs'
                rules={[
                  {
                    required: true,
                    message:
                      "Please select your approximate consumed materials costs!",
                  },
                ]}
              >
                <Input placeholder='Enter the number' type='number' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={56}>
            <Col className='gutter-row' span={12}>
              <Form.Item
                label='What are your approximate subcontracting costs per year?'
                name='subcontracting_costs'
                rules={[
                  {
                    required: true,
                    message:
                      "Please select your approximate subcontracting costs!",
                  },
                ]}
              >
                <Input placeholder='Enter the number' type='number' />
              </Form.Item>
            </Col>
            <Col className='gutter-row' span={12}>
              <Form.Item
                label='What are your approximate software costs per year?'
                name='software_costs'
                rules={[
                  {
                    required: true,
                    message: "Please select your approximate software costs!",
                  },
                ]}
              >
                <Input placeholder='Enter the number' type='number' />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className='control-submit'>
            <Button type='primary' htmlType='submit'>
              Next
            </Button>
            <Button
              type='text'
              onClick={() => {
                goPrevStep();
              }}
            >
              Back
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default WelcomeStep3;
