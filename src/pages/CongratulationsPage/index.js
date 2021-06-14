import React, { useState, useEffect } from 'react';
import Layout from '../../components/LayoutDashboard/Layout';
import { Form, Button, Input } from 'antd';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { sendApproveReport } from '../../core/services';

import { CongrCard1, CongrCard2, CongrCard3 } from '../../components/icons';

import './style.scss';

const CongratulationsPage = () => {
  const [loading, setLoading] = useState(false);
  const [isSended, setIsSended] = useState(false);
  const [form] = Form.useForm();
  const finalReport = useSelector((state) => state.claims.finalReport);
  const history = useHistory();

  useEffect(() => {
    if (!finalReport) history.push('/active-claims');
  }, []);

  const convertDate = (date) => {
    function convertDate(inputFormat) {
      function pad(s) {
        return s < 10 ? '0' + s : s;
      }
      var d = new Date(inputFormat);
      return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
    }
    return convertDate(date);
  };

  const onFinishName = (value) => {
    setLoading(true);
    sendApproveReport(finalReport.claimId, value)
      .then((data) => {
        setLoading(false);
        setIsSended(true);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  return (
    <Layout className="dashboard">
      <div className="congrat_wrapper">
        <h2>Congratulations!</h2>
        <div className="cards_wrapper">
          <div className="card card1">
            <h3>{finalReport?.final_benefit_amount} £</h3>
            <p>Final benefit amount</p>
            <div className="circle">
              <CongrCard1 />
            </div>
          </div>
          <div className="card card2">
            <h3>
              {finalReport?.time_taken_to_complete} {finalReport?.time_taken_to_complete > 1 ? 'days' : 'day'}
            </h3>
            <p>Time taken to complete report</p>
            <div className="circle">
              <CongrCard2 />
            </div>
          </div>
          <div className="card card3">
            <h3>{convertDate(finalReport?.estimated_payment_date)}</h3>
            <p>Estimated payment date</p>
            <div className="circle">
              <CongrCard3 />
            </div>
          </div>
        </div>
        <div className="email_block">
          {!isSended ? (
            <Form name="name" layout="vertical" form={form} requiredMark={true} onFinish={onFinishName}>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: 'email',
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}>
                <Input placeholder="Enter the email" />
              </Form.Item>

              <Form.Item className="registration--submit">
                <Button type="primary" htmlType="submit" loading={loading}>
                  Send to Accountant
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <div className="email_block-text">
              We sent all the documents to your accountant and created new claim automatically. If you have any
              questions or need any help — contact us.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
export default CongratulationsPage;
