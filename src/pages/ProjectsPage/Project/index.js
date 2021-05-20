import React from 'react';
import { Form, Select, Button, Input, Upload } from 'antd';

import { IconDeleteFile } from '../../../components/icons';

import iconSelectArrow from '../../../assets/img/iceon-select-arrow.svg';
import iconUpload from '../../../assets/img/icon-upload.svg';
import iconPdf from '../../../assets/img/icon-pdf.svg';

import './style.scss';

const { Option } = Select;
const { Dragger } = Upload;

const Project = ({ field, add, remove }) => {
  const onFinish = (valuse) => {
    console.log(valuse);
  };

  return (
    <div className="project">
      <div className="project__forms">
        <div className="project__forms_title">
          <h2>Active claim title</h2>
          <time>01/01/2021 – 31/12/2021</time>
        </div>
        <div className="project__form">
          <div className="project__form_inputs">
            <Form.Item label="Project Title" name="username">
              <Input placeholder="Enter the title" />
            </Form.Item>
          </div>
          <div className="project__form_dates">
            <div className="start-dates">
              <Form.Item name="start-months" label="Start Date">
                <Select
                  placeholder="Please select start months"
                  suffixIcon={<img src={iconSelectArrow} alt="" />}
                  className="months-select">
                  <Option value="01">January</Option>
                  <Option value="02">February</Option>
                  <Option value="03">March</Option>
                  <Option value="04">April</Option>
                  <Option value="05">May</Option>
                  <Option value="06">June</Option>
                  <Option value="07">July</Option>
                  <Option value="08">August</Option>
                  <Option value="09">September</Option>
                  <Option value="10">October</Option>
                  <Option value="11">November</Option>
                  <Option value="12">December</Option>
                </Select>
              </Form.Item>
              <Form.Item name="start-year">
                <Select
                  placeholder="Please select start year"
                  suffixIcon={<img src={iconSelectArrow} alt="" />}
                  className="years-select">
                  <Option value="2021">2021</Option>
                  <Option value="2020">2020</Option>
                  <Option value="2019">2019</Option>
                  <Option value="2018">2018</Option>
                  <Option value="2017">2017</Option>
                </Select>
              </Form.Item>
            </div>
            <div className="end-dates">
              <Form.Item name="end-months" label="End Date">
                <Select
                  placeholder="Please select start months"
                  className="months-select"
                  suffixIcon={<img src={iconSelectArrow} alt="" />}>
                  <Option value="01">January</Option>
                  <Option value="02">February</Option>
                  <Option value="03">March</Option>
                  <Option value="04">April</Option>
                  <Option value="05">May</Option>
                  <Option value="06">June</Option>
                  <Option value="07">July</Option>
                  <Option value="08">August</Option>
                  <Option value="09">September</Option>
                  <Option value="10">October</Option>
                  <Option value="11">November</Option>
                  <Option value="12">December</Option>
                </Select>
              </Form.Item>
              <Form.Item name="end-year">
                <Select
                  placeholder="Please select start year"
                  suffixIcon={<img src={iconSelectArrow} alt="" />}
                  className="years-select">
                  <Option value="2021">2021</Option>
                  <Option value="2020">2020</Option>
                  <Option value="2019">2019</Option>
                  <Option value="2018">2018</Option>
                  <Option value="2017">2017</Option>
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="project__form_inputs">
            <Form.Item label="Objectives" name="objectives">
              <Input.TextArea placeholder="Enter objectives" style={{ height: 112 }} />
            </Form.Item>
          </div>
          <div className="project__form_inputs">
            <Form.Item label="Non-Routine Challenges" name="challenges">
              <Input.TextArea placeholder="Enter challenges" style={{ height: 156 }} />
            </Form.Item>
          </div>
          <div className="project__form_submit">
            <Button
              type="button"
              onClick={() => {
                add();
              }}>
              Add One More Project
            </Button>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Project to Dashboard
              </Button>
            </Form.Item>
          </div>
        </div>
      </div>
      <div className="project__docs">
        <h3>Add Related Documents</h3>
        <div className="project__docs_status">
          <div className="status review">On Review</div>
        </div>
        <div className="project__docs_list">
          <Dragger>
            <img src={iconUpload} alt="" />
            <span>Add the Document</span>
          </Dragger>
          <ul className="file--list">
            <li>
              <img src={iconPdf} alt="" />
              <span>Document one</span>
              <button className="file--list-remove">
                <IconDeleteFile />
              </button>
            </li>
            <li>
              <img src={iconPdf} alt="" />
              <span>Document one</span>
              <button className="file--list-remove">
                <IconDeleteFile />
              </button>
            </li>
            <li>
              <img src={iconPdf} alt="" />
              <span>Document one</span>
              <button className="file--list-remove">
                <IconDeleteFile />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Project;
