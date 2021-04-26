import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Skeleton, Drawer, Tooltip } from "antd";
import { getFinancialClaimStep } from "../../../../core/services";

import UploadFile from "../../../../components/UploadFile";
import iconScheduled from "../../../../assets/img/icon-scheduled.svg";
import iconCalendar from "../../../../assets/img/icon-calendar.svg";
import iconApproved from "../../../../assets/img/icon-approved.svg";
import arrowLeft from "../../../../assets/img/arrow-left.svg";

import "./style.scss";

const StepFinancial = () => {
  const [financialStep, setFinancialStep] = useState(null);
  const [detailsShow, setDetailsShow] = useState(false);
  const activeClaimId = useSelector((state) => state.user.activeClaimId);

  useEffect(() => {
    if (activeClaimId) {
      getFinancialClaimStep(activeClaimId)
        .then((data) => {
          const res = { ...data };
          res.documents = data.documents.map((item) => {
            item.red = false;
            return item;
          });
          setFinancialStep(res);
          console.log("getFinancialClaimStep", res);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [activeClaimId]);

  const onAction = (file) => {
    const res = { ...financialStep };
    res.documents = financialStep.documents.map((item) => {
      if (item.id === file.id) item = file;
      return item;
    });
    setFinancialStep(res);
  };

  return (
    <section className='active-claims__steps_step financial'>
      <h2
        onClick={() => {
          setDetailsShow(true);
        }}
      >
        2<i>/</i>5 Financial
      </h2>

      {!financialStep ? (
        <Skeleton active />
      ) : (
        <>
          <div className='step-actions'>
            {financialStep.documents.map((item) => (
              <UploadFile
                key={`introduction-document-${item.id}`}
                file={item}
                skipButton={true}
                onAction={onAction}
              />
            ))}
          </div>
          <div className='step-status'>
            {financialStep.call_date === null && (
              <button className='step-status--call-schedule'>
                <img src={iconCalendar} alt='' />
                <span>Schedule a call</span>
              </button>
            )}
            {/* <div className='step-status--call-reminder'>
              <div className='reminder-title'>
                <img src={iconScheduled} alt='' />
                <span>Call today at 8:00PM</span>
              </div>
              <div className='reminder-description'>
                Check email for details
              </div>
            </div>

            <div className='step-status--call-completed'>
              <img src={iconApproved} alt='' />
              <span>Call is completed</span>
            </div> */}

            <div className='step-status--bar waiting'>
              <span className='step-status--bar-fill' style={{ width: "0%" }} />
              <span className='step-status--bar-parcent'>0%</span>
              <span className='step-status--bar-detail'>Waiting</span>
            </div>
          </div>

          <Drawer
            title={
              <div className='ant-drawer-title-wripper'>
                <img src={arrowLeft} />
                <p>
                  2<i>/</i>5 Financial
                </p>
              </div>
            }
            placement='right'
            width='320px'
            closable={false}
            onClose={() => {
              setDetailsShow(false);
            }}
            visible={detailsShow}
            className='active-claims__step_drawer'
          >
            <div className='step-actions'>
              {financialStep.documents.map((item) => {
                return (
                  <div
                    className='row'
                    key={`introduction-document-${item.id}`}
                    style={
                      item.red ? { background: "rgba(246, 87, 71, 0.15)" } : {}
                    }
                  >
                    <UploadFile
                      file={item}
                      removeButton={true}
                      skipButton={true}
                      onAction={onAction}
                      onRed={(red) => {
                        //introductionStep, setIntroductionStep
                        const res = { ...financialStep };
                        res.documents.map((row) => {
                          if (row.id === item.id) row.red = red;
                          return row;
                        });
                        setFinancialStep(res);
                        //item.red = red;
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div className='step-status'>
              <div className='step-status--bar waiting'>
                <span
                  className='step-status--bar-fill'
                  style={{ width: "0%" }}
                />
                <span className='step-status--bar-parcent'>0%</span>
                <span className='step-status--bar-detail'>Waiting</span>
              </div>
            </div>
          </Drawer>
        </>
      )}
    </section>
  );
};

export default StepFinancial;
