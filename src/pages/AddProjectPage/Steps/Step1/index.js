import React, { useRef, useState } from "react";
import { Form, Carousel, Button, Input, AutoComplete } from "antd";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import _ from "underscore";

import { fetchCompanyHouse } from "../../../../core/services";
import actions from "../../../../core/actions";

import "./style.scss";

const WelcomeStep1 = ({ goNextStep }) => {
  const slider = useRef();
  const inputSearch = useRef();
  const [options, setOptions] = useState([]);
  const [companyName, setCompanyName] = useState(null);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.registration);

  const [form] = Form.useForm();
  const { registrationUpdateState } = bindActionCreators(actions, dispatch);

  const fetchCompanyHouseDelay = _.debounce((searchText) => {
    setCompanyName(null);
    if (searchText.length < 3) {
      setOptions([]);
    } else {
      setLoader(true);
      fetchCompanyHouse(searchText).then((data) => {
        let results = [];
        if (data.length) {
          results = data.map((item, index) => {
            item.value = item.company_name;
            item.key = `company-${index}`;
            return item;
          });
        } else {
          if (data.company_name) {
            data.value = data.company_name;
            results.push(data);
          }
        }

        setOptions(results);
        setLoader(false);
      });
    }
  }, 500);

  const onSearch = (searchText) => {
    fetchCompanyHouseDelay(searchText);
  };

  const onSelect = (value, options) => {
    setCompanyName(options);
  };

  const onFinishName = (value) => {
    const companyData = {
      name: companyName.company_name,
      number: companyName.company_number,
      industry: companyName.industries,
    };
    registrationUpdateState(companyData);
    setOptions([]);
    slider.current.next();
  };

  return (
    <div className='hello-page__step'>
      <Carousel ref={slider} dots={false} effect='fade' swipe={false}>
        {/* WHAT IS YOUR COMPANY NAME? */}
        <div className='step--wrapper'>
          <Form
            name='name'
            layout='vertical'
            requiredMark={false}
            onFinish={onFinishName}
            // onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label='What is your company name?'
              name='name'
              validateTrigger='onSelect'
              rules={[
                {
                  validateTrigger: "onSelect",
                  validator: (_, value) => {
                    if (companyName) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error("Please input your company name!")
                    );
                  },
                },
              ]}
            >
              <AutoComplete
                options={options}
                onSelect={onSelect}
                onSearch={onSearch}
                className='hello-page__autocomplete'
                notFoundContent='Nothing found'
              >
                <Input.Search placeholder='Enter the name' loading={loader} />
              </AutoComplete>
            </Form.Item>

            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Next
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* IS THIS YOUR COMPANY NUMBER ON COMPANIES HOUSE? */}
        <div className='step--wrapper'>
          <div className='step--label'>
            Is this your company number on companies house?
          </div>
          <div className='step--value'>{state.number}</div>
          <div className='control-submit'>
            <Button
              type='primary'
              onClick={() => {
                //slider.current.goTo(3);
                goNextStep();
              }}
            >
              Yes
            </Button>
            <Button
              type='text'
              onClick={() => {
                slider.current.goTo(2);
                setCompanyName(null);
                form.setFieldsValue({
                  number: "",
                });
              }}
            >
              No
            </Button>
          </div>
        </div>

        {/* WHAT IS YOUR REGISTERED COMPANY NAME OR NUMBER? */}
        <div className='step--wrapper'>
          <Form
            name='number'
            form={form}
            layout='vertical'
            requiredMark={false}
            onFinish={(values) => {
              const companyData = {
                name: companyName.company_name,
                number: companyName.company_number,
                industry: companyName.industries,
              };
              registrationUpdateState(companyData);
              setOptions([]);
              //slider.current.goTo(1);
              goNextStep();
            }}
            // onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label='What is your registered company name or number?'
              name='number'
              validateTrigger='onSelect'
              rules={[
                {
                  validateTrigger: "onSelect",
                  validator: (_, value) => {
                    if (companyName) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error("Please input your company name or number!")
                    );
                  },
                },
              ]}
            >
              <AutoComplete
                options={options}
                onSelect={onSelect}
                onSearch={onSearch}
                className='hello-page__autocomplete'
                notFoundContent='Nothing found'
              >
                <Input.Search
                  placeholder='Enter the name'
                  loading={loader}
                  ref={inputSearch}
                />
              </AutoComplete>
            </Form.Item>
            <Form.Item className='control-submit'>
              <Button type='primary' htmlType='submit'>
                Next
              </Button>
              {/* <Button
                type='text'
                onClick={() => {
                  slider.current.prev();
                  setOptions([]);
                  setCompanyName(null);
                }}
              >
                Back
              </Button> */}
            </Form.Item>
          </Form>
        </div>

        {/* IS THIS YOUR COMPANY? */}
        <div className='step--wrapper'>
          <div className='step--label'>Is this your company?</div>
          <div className='step--value'>{state.name}</div>
          <div className='control-submit'>
            <Button type='primary' onClick={goNextStep}>
              Yes
            </Button>
            <Button
              type='text'
              onClick={() => {
                setCompanyName(null);
                setOptions([]);
                slider.current.prev();
                form.setFieldsValue({
                  number: "",
                });
              }}
            >
              No
            </Button>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default WelcomeStep1;
