import React, { useEffect, useRef, useState } from "react";
import { Form, Carousel, Button, Select } from "antd";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";

import actions from "../../../../core/actions";
import services from "../../../../core/services";

import "./style.scss";

const { fetchAllIndustries } = services;

const WelcomeStep2 = ({ goNextStep, goPrevStep }) => {
  const [industry, setIndustry] = useState(null);
  const slider = useRef();
  const state = useSelector((state) => state.registration);
  const dispatch = useDispatch();
  const { registrationUpdateState } = bindActionCreators(actions, dispatch);

  useEffect(() => {
    fetchAllIndustries(dispatch);
    if (!state.industry) slider.current.next();
  }, []);

  const onFinishName = (value) => {
    slider.current.next();
    registrationUpdateState({
      industry: industry,
    });
  };

  const onSelect = (value, option) => {
    setIndustry([option]);
  };

  return (
    <div className='hello-page__step'>
      <Carousel ref={slider} dots={false} effect='fade' swipe={false}>
        <div className='step--wrapper'>
          <div className='step--label'>Is your company in the industry of</div>
          <div className='step--value'>
            {state.industry.length > 0 &&
              state.industry.map((item, index) => (
                <p key={`in-${index}`}>
                  {item.sic_code} - {item.display_value}
                </p>
              ))}
          </div>
          <div className='control-submit'>
            <Button
              type='primary'
              onClick={() => {
                goNextStep();
              }}
            >
              Yes
            </Button>
            <Button
              type='text'
              onClick={() => {
                slider.current.prev();
              }}
            >
              No
            </Button>
          </div>
        </div>
        <div className='step--wrapper'>
          <Form
            layout='vertical'
            requiredMark={false}
            onFinish={onFinishName}
            // onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label='What is your company’s industry?'
              name='industry'
              rules={[
                {
                  required: true,
                  message: "Please select your company’s industry!",
                },
              ]}
            >
              <Select
                showSearch
                size='large'
                showArrow={false}
                placeholder='Select a person'
                optionFilterProp='children'
                options={state.industriesList}
                onSelect={onSelect}
                // onChange={onChange}
                // onFocus={onFocus}
                // onBlur={onBlur}
                // onSearch={onSearch}
                filterOption={(input, option) => {
                  return (
                    option.display_value
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  );
                }}
              ></Select>
            </Form.Item>

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
      </Carousel>
    </div>
  );
};

export default WelcomeStep2;
