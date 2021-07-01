import React, { useState, useEffect, useCallback } from 'react';
import { Skeleton, Tooltip, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom';

import actions from '../../../../core/actions';
import UploadFile from '../../../../components/UploadFile';

import { getSubmissionClaimStep, setApproveClime } from '../../../../core/services';
import IconInfo from '../../../../assets/img/icon-info.svg';

import './style.scss';

const StepSubmission = () => {
  const [submissionStep, setSubmissionStep] = useState(null);
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(false);
  const activeClaimId = useSelector((state) => state.user.activeClaimId);
  const activeClaimIdStatus = useSelector((state) => state.claims.activeClaimStatus);
  const dispatch = useDispatch();
  const history = useHistory();
  const { setStepStatus, setFinalReport, setClaimsToFalse } = bindActionCreators(actions, dispatch);

  const activeClaimIdDone = () => {
    return (
      activeClaimIdStatus.introduction &&
      activeClaimIdStatus.financial &&
      activeClaimIdStatus.technical &&
      activeClaimIdStatus.deliverables &&
      activeClaimIdStatus.submission
    );
  };

  useEffect(() => {
    if (activeClaimId) {
      setSubmissionStep(null);
      getSubmissionClaimStep(activeClaimId).then((data) => {
        console.log('data', data);
        setSubmissionStep(data);
        const status = Math.round(
          (data.documents.filter((item) => item.status === 3).length / data.documents.length) * 100,
        );
        if (status === 100) {
          setStepStatus({
            name: 'submission',
            status: true,
          });
        }
        setStatus(status);
      });
    }
  }, [activeClaimId]);

  const onAction = (file) => {
    const res = { ...submissionStep };
    res.documents = submissionStep.documents.map((item) => {
      if (item.id === file.id) item = file;
      return item;
    });
    setSubmissionStep(res);
    const status = Math.round((res.documents.filter((item) => item.status === 3).length / res.documents.length) * 100);
    setStatus(status);
  };

  const approveClaim = () => {
    if (!activeClaimIdDone) return;
    setLoading(true);
    setClaimsToFalse();
    setApproveClime(activeClaimId)
      .then((data) => {
        const res = {
          ...data,
          claimId: activeClaimId,
        };
        setFinalReport(res);
        history.push('/active-claims/congratulations');
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  return (
    <section className="active-claims__steps_step deliverables">
      <h2>
        <p>
          5<i>/</i>5 Submission
        </p>
        <Tooltip title="You don’t have to upload files for this stage. The Gratner team will do it for you when all the previous stages will be approved">
          <span>
            <img src={IconInfo} alt="" />
          </span>
        </Tooltip>
      </h2>
      {!submissionStep ? (
        <Skeleton active />
      ) : (
        <>
          <div className="step-actions">
            {submissionStep.documents.map((item) =>
              item.url ? (
                <UploadFile key={`submission-document-${item.id}`} file={item} onAction={onAction} />
              ) : (
                <div className="step-report-empty" key={`submission-document-${item.id}`}>
                  {item.name}
                </div>
              ),
            )}
            {/* <div className="step-report-empty">Technical report narrative</div>
            <div className="step-report-empty">Financial analysis</div> */}
          </div>
          <div className="step-status">
            <Button
              type="primary"
              loading={loading}
              disabled={!activeClaimIdDone()}
              className="step-status--approve"
              onClick={approveClaim}>
              Approve
            </Button>
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

export default StepSubmission;
