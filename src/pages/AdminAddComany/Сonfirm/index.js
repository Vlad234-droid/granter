import React, { useCallback, useEffect, useState } from 'react';
import { Button, Row, Col, Card, Spin, notification } from 'antd';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import './style.scss';
import { UpVector } from '../../../components/icons';
import BenefitModal from './BenefitModal';
import actions from '../../../core/actions';
import { useDispatch } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { bindActionCreators } from 'redux';
import { addNewCompany } from '../../../core/adminServices';

const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;

const Сonfirm = ({ goNextStep, goPrevStep, maxPrice, minPrice }) => {
  const state = useSelector((state) => state.registration);
  const [loader, setLoader] = useState(false);
  const [isModalBenefit, setIsModalBenefit] = useState(false);
  const { showEstimate } = useSelector((state) => state.registration);
  const dispatch = useDispatch();
  const { clientId } = useParams();
  const history = useHistory();
  const { registrationChangeEstimate } = bindActionCreators(actions, dispatch);

  useEffect(() => {
    if (showEstimate === 'estimate') {
      setIsModalBenefit(() => true);
    }

    return () => {
      setIsModalBenefit(() => false);
    };
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
    addNewCompany(clientId, companyData).then((data) => {
      setLoader(false);
      notification.success({
        description: 'Company was created successfully',
      });
      history.push(`/admin/client/${clientId}`);
    });

    registrationChangeEstimate(null);
  };

  const checkorForRenderBenefitModal = useCallback(() => {
    if (showEstimate === 'benefit') {
      return (
        <div className="wrapper_total_benefit">
          <p>Estimated total claim benefit</p>
          <h2>{`£${minPrice} - £${maxPrice}`}</h2>
          {/* <div className="block_info_img">
            <h5>YoY Change:</h5>
            <UpVector />
            <h6>13%</h6>
          </div> */}
        </div>
      );
    } else if (showEstimate === 'estimate') {
      return (
        <BenefitModal
          goNextStep={goNextStep}
          state={state}
          isModalBenefit={isModalBenefit}
          setIsModalBenefit={setIsModalBenefit}
        />
      );
    }
  }, [isModalBenefit, setIsModalBenefit, showEstimate]);

  if (state.showEstimate === null)
    return (
      <div className="upload-loading">
        <Spin indicator={antIcon} />
      </div>
    );

  return (
    <div className={`welcome__comfirm ${isModalBenefit ? '' : 'isBenefitModal'}`}>
      <h1>Please confirm information to proceed to official service agreement</h1>
      <div className="hello-page__description">
        Thank you for signing up to work with Granter or your next R&D tax credit claim. We are excited to be working
        with you in the future.
      </div>

      {showEstimate !== null && checkorForRenderBenefitModal()}

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
              {state.industry?.length > 0 &&
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
        <Button type="primary" onClick={addCompany} loading={loader}>
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
