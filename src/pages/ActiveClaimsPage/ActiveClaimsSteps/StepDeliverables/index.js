import React, { useState, useEffect } from 'react';
import { Skeleton, Tooltip } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import UploadFile from '../../../../components/UploadFile';

import actions from '../../../../core/actions';
import { getDeliverablesClaimStep } from '../../../../core/services';
import IconInfo from '../../../../assets/img/icon-info.svg';

import './style.scss';

const StepDeliverables = () => {
  const [deliverablesStep, setDeliverablesStep] = useState(null);
  const [status, setStatus] = useState(0);
  const activeClaimId = useSelector((state) => state.user.activeClaimId);
  const dispatch = useDispatch();
  const { setStepStatus } = bindActionCreators(actions, dispatch);

  useEffect(() => {
    if (activeClaimId) {
      setDeliverablesStep(null);
      getDeliverablesClaimStep(activeClaimId).then((data) => {
        setDeliverablesStep(data);
        const status = Math.round(
          (data.documents.filter((item) => item.status === 3).length / data.documents.length) * 100,
        );
        if (status === 100) {
          setStepStatus({
            name: 'deliverables',
            status: true,
          });
        }
        setStatus(status);
      });
    }
  }, [activeClaimId]);

  const onAction = (file) => {
    const res = { ...deliverablesStep };
    res.documents = deliverablesStep.documents.map((item) => {
      if (item.id === file.id) item = file;
      return item;
    });
    setDeliverablesStep(res);
    const status = Math.round((res.documents.filter((item) => item.status === 3).length / res.documents.length) * 100);
    setStatus(status);
  };

  return (
    <section className="active-claims__steps_step deliverables">
      <h2>
        <p>
          4<i>/</i>5 Deliverables
        </p>
        <Tooltip title="This stage will be enabled once all submission documents have been generated and uploaded by your consultant. Please review each document when possible and set each status to approve, this will activate the blue 'Approve' button to send the claim submission to your accountant.">
          <span>
            <img src={IconInfo} alt="" />
          </span>
        </Tooltip>
      </h2>
      {!deliverablesStep ? (
        <Skeleton active />
      ) : (
        <>
          <div className="step-actions">
            {deliverablesStep.documents.map((item) =>
              item.url ? (
                <UploadFile key={`deliverables-document-${item.id}`} file={item} onAction={onAction} />
              ) : (
                <div className="step-report-empty" key={`deliverables-document-${item.id}`}>
                  {item.name}
                </div>
              ),
            )}
            {/* <div className="step-report-empty">Technical report narrative</div>
            <div className="step-report-empty">Financial analysis</div> */}
          </div>
          <div className="step-status">
            <div className={`step-status--bar ${status === 100 ? 'done' : status > 0 ? 'process' : 'waiting'}`}>
              <span className="step-status--bar-fill" style={{ width: (status ? status : 0) + '%' }} />
              <span className="step-status--bar-parcent">{status ? status : 0}%</span>
              <span className="step-status--bar-detail">
                {status === 100 ? 'Finished' : status > 0 ? 'In Progress' : 'Waiting'}
              </span>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default StepDeliverables;
