import React, { useCallback, useEffect, useState } from 'react';
import { Button, Row, Col, Card } from 'antd';
import { useSelector } from 'react-redux';
import './style.scss';
import { UpVector } from '../../../components/icons';
import BenefitModal from './BenefitModal';

const Сonfirm = ({ goNextStep, goPrevStep, indexStep }) => {
  const state = useSelector((state) => state.registration);
  const [isModalBenefit, setIsModalBenefit] = useState(null);

  console.log(indexStep);

  useEffect(() => {
    if (indexStep === 1) {
      setIsModalBenefit(() => true);
    }
  }, [indexStep]);

  const checkorForRenderBenefitModal = useCallback(() => {
    if (indexStep === 1) {
      return (
        <div className="wrapper_total_benefit">
          <p>Estimated total claim benefit</p>
          <h2>£2,000 - £5,000 </h2>
          <div className="block_info_img">
            <h5>YoY Change:</h5>
            <UpVector />
            <h6>13%</h6>
          </div>
        </div>
      );
    } else if (indexStep === 3) {
      return <BenefitModal isModalBenefit={isModalBenefit} setIsModalBenefit={setIsModalBenefit} />;
    }
  }, [indexStep, isModalBenefit, setIsModalBenefit]);

  return (
    <div className={`welcome__comfirm ${isModalBenefit ? '' : 'isBenefitModal'}`}>
      <h1>Please confirm information to proceed to official service agreement</h1>
      <div className="hello-page__description">
        Thank you for signing up to work with Granter or your next R&D tax credit claim. We are excited to be working
        with you in the future.
      </div>
      {checkorForRenderBenefitModal()}

      <div className="welcome__comfirm_info">
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
      <div className="welcome__comfirm_submit">
        <Button type="primary" onClick={goNextStep}>
          Confirm
        </Button>
        <Button type="text" onClick={goPrevStep}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default Сonfirm;
