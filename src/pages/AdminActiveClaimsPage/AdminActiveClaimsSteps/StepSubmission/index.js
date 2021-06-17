import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from 'antd';

import { getSubmissionClaimStep } from '../../../../core/adminServices';

import AdminUploadFile from '../../../../components/AdminUploadFile';

import './style.scss';

const StepSubmission = ({ refreshCards }) => {
  const [submissionStep, setSubmissionStep] = useState(null);
  const [status, setStatus] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSubmissionClaimStep(id).then((data) => {
        setSubmissionStep(data);
        const status = Math.round(
          (data.documents.filter((item) => item.status === 3).length / data.documents.length) * 100,
        );
        setStatus(status);
      });
    }
  }, [id]);

  const onAction = (file) => {
    const res = { ...submissionStep };
    res.documents = submissionStep.documents.map((item) => {
      if (item.id === file.id) {
        const clone = { ...file };
        if (!clone.comments_count) clone.comments_count = item.comments_count;
        item = clone;
      }
      return item;
    });
    setSubmissionStep(res);
    const status = Math.round((res.documents.filter((item) => item.status === 3).length / res.documents.length) * 100);
    setStatus(status);
    refreshCards(true);
  };

  const checkForAllStatus = () => {
    //if (!submissionStep?.documents.filter((item) => item.status !== 3).length) approveStep(id, 1);
  };

  return (
    <section className="active-claims__steps_step admin-deliverables">
      <h2>
        5<i>/</i>5 Submission
      </h2>
      {!submissionStep ? (
        <Skeleton active />
      ) : (
        <>
          <div className="step-actions">
            {submissionStep.documents.map((item) => (
              <div
                className="row admin"
                key={`introduction-document-${item.id}`}
                style={item.red ? { background: 'rgba(246, 87, 71, 0.15)' } : {}}>
                <AdminUploadFile
                  checkForAllStatus={checkForAllStatus}
                  removeButton={true}
                  key={`introduction-document-${item.id}`}
                  file={item}
                  onAction={onAction}
                  onRed={(red) => {
                    //introductionStep, setIntroductionStep
                    const res = { ...submissionStep };
                    res.documents.map((row) => {
                      if (row.id === item.id) row.red = red;
                      return row;
                    });
                    setSubmissionStep(res);
                    //item.red = red;
                  }}
                />
              </div>
            ))}
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

export default StepSubmission;
