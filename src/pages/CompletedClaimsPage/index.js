import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Skeleton } from 'antd';

import Layout from '../../components/LayoutDashboard/Layout';
import { getCompletedClaimData } from '../../core/services';

import './style.scss';

const CompletedClaimsPage = () => {
  const [completedClaimsData, setCompletedClaimsData] = useState(null);
  const user = useSelector((state) => state.user.currentCompany);

  useEffect(() => {
    if (user) {
      getCompletedClaimData(user.id).then((data) => {
        console.log('thi sis completes claims', data);
        setCompletedClaimsData(data);
      });
    }
  }, [user]);

  return (
    <Layout isLogged={false} className="dashboard">
      <div className="future-claims">
        {!completedClaimsData ? (
          <Skeleton active />
        ) : (
          <ul className="future-claims__list">
            {completedClaimsData.map((item) => (
              <li key={`claim-${item.id}`} className="future-claim">
                <div className="future-claim--title">{item.title}</div>
                <div className="future-claim--row">
                  <span>R&D Tax Relief Claim</span>
                  <b>{item.start_date}</b>
                </div>
                <div className="future-claim--row">
                  <span>Estimated completion</span>
                  <b>{item.end_date}</b>
                </div>
                <div className="future-claim--row">
                  <span>Estimated benefit</span>
                  <b>£ {item.estimated_benefit}</b>
                </div>
                <div className="future-claim--row">
                  <span>Consultant fee</span>
                  <b>20%</b>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default CompletedClaimsPage;
