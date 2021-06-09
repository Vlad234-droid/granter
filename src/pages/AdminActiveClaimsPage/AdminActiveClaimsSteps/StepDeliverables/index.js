import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from 'antd';

import { getDeliverablesClaimStep } from '../../../../core/adminServices';

import AdminUploadFile from '../../../../components/AdminUploadFile';

import './style.scss';

const StepDeliverables = () => {
  const [deliverablesStep, setDeliverablesStep] = useState(null);
  const [status, setStatus] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getDeliverablesClaimStep(id).then((data) => {
        setDeliverablesStep(data);
        const status = Math.round(
          (data.documents.filter((item) => item.status === 3).length / data.documents.length) * 100,
        );
        setStatus(status);
      });
      // setTechnicalStep(null);
      // getTechnicalClaimStep(id).then((data) => {
      //   const result = { ...data };
      //   result.documents = data.documents.filter((item) => item.title.length && item.start_date && item.end_date);
      //   data.documents.forEach((item) => {
      //     if (item.title === '' || !item.start_date || !item.end_date) {
      //       removeProject(item.claim_id, item.id);
      //     }
      //   });
      //   setTechnicalStep(result);
      //   const { addProjectsDetails } = bindActionCreators(actions, dispatch);
      //   addProjectsDetails(result.documents);
      // });
    }
  }, [id]);

  const onAction = (file) => {
    const res = { ...deliverablesStep };
    res.documents = deliverablesStep.documents.map((item) => {
      if (item.id === file.id) {
        const clone = { ...file };
        if (!clone.comments_count) clone.comments_count = item.comments_count;
        item = clone;
      }
      return item;
    });
    setDeliverablesStep(res);
    const status = Math.round((res.documents.filter((item) => item.status === 3).length / res.documents.length) * 100);
    setStatus(status);
  };

  const checkForAllStatus = () => {
    //if (!deliverablesStep?.documents.filter((item) => item.status !== 3).length) approveStep(id, 1);
  };

  return (
    <section className="active-claims__steps_step admin-deliverables">
      <h2>
        4<i>/</i>5 Deliverables
      </h2>
      {!deliverablesStep ? (
        <Skeleton active />
      ) : (
        <>
          <div className="step-actions">
            {deliverablesStep.documents.map((item) => (
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
                    const res = { ...deliverablesStep };
                    res.documents.map((row) => {
                      if (row.id === item.id) row.red = red;
                      return row;
                    });
                    setDeliverablesStep(res);
                    //item.red = red;
                  }}
                />
              </div>
            ))}
          </div>
          <div className="step-status">
            <div className={`step-status--bar ${status === 100 ? 'done' : status > 0 ? 'process' : 'waiting'}`}>
              <span className="step-status--bar-fill" style={{ width: status + '%' }} />
              <span className="step-status--bar-parcent">{status}%</span>
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
