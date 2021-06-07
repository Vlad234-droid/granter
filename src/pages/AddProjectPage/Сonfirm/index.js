import React, { useState, useEffect, useCallback } from 'react';
import { Button, Row, Col, Card, notification, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { UpVector } from '../../../components/icons';
import BenefitModal from './BenefitModal';
import { addNewCompany } from '../../../core/services';
import { LoadingOutlined } from '@ant-design/icons';

import './style.scss';

const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;

const Сonfirm = ({ goPrevStep, maxPrice, minPrice }) => {
  const [loader, setLoader] = useState(false);
  const state = useSelector((state) => state.registration);
  let history = useHistory();
  const [isModalBenefit, setIsModalBenefit] = useState(null);
  const { showEstimate } = useSelector((state) => state.registration);

  useEffect(() => {
    if (showEstimate === 'estimate') {
      setIsModalBenefit(() => true);
    }
  }, [showEstimate]);

  const addCompany = () => {
    setLoader(true);
    const companyData = {
      name: state.name,
      number: state.number,
      industry_ids: state.industry,
      staffing_costs: state.staffing_costs,
      materials_costs: state.materials_costs,
      subcontracting_costs: state.subcontracting_costs,
      software_costs: state.software_costs,
    };
    addNewCompany(companyData).then((data) => {
      setLoader(false);
      notification.success({
        description: 'Company was created successfully',
      });
      history.push('/profile/');
    });
  };

  const checkorForRenderBenefitModal = useCallback(() => {
    if (showEstimate === 'benefit') {
      return (
        <div className="wrapper_total_benefit">
          <p>Estimated total claim benefit</p>
          <h2>{`£${minPrice} - £${maxPrice}`}</h2>
        </div>
      );
    } else if (showEstimate === 'estimate') {
      return <BenefitModal state={state} isModalBenefit={isModalBenefit} setIsModalBenefit={setIsModalBenefit} />;
    }
  }, [isModalBenefit, setIsModalBenefit, showEstimate]);

  return (
    <div className={`welcome__comfirm ${isModalBenefit ? '' : 'isBenefitModal'}`}>
      <h1>Please confirm information to proceed to official service agreement</h1>

      <div className="hello-page__description">
        Thank you for signing up to work with Granter or your next R&D tax credit claim. We are excited to be working
        with you in the future.
      </div>
      {state.showEstimate === null ? (
        <div className="upload-loading">
          <Spin indicator={antIcon} />
        </div>
      ) : (
        checkorForRenderBenefitModal()
      )}
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
        <Button type="primary" loading={loader} onClick={addCompany}>
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
