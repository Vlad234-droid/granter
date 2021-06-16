import React, { useEffect, useState } from 'react';
import { Skeleton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../../components/LayoutDashboard/Layout';
import ActiveClaimsCards from './ActiveClaimsCards';
import ActiveClaimsSteps from './ActiveClaimsSteps';

import { getActiveClaimData } from '../../core/services';

import './style.scss';

const ActiveClaimsPage = (props) => {
  const [activeClaimData, setActiveClaimData] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentCompany);
  const userData = useSelector((state) => state.user.data);
  const [link, setLink] = useState('');

  useEffect(() => {
    if (user) {
      getActiveClaimData(dispatch, user.id).then((data) => {
        setActiveClaimData(data);
        setLink(() => data.hubspot_link);
      });
    }
  }, [user]);

  return (
    <Layout isLogged={false} className="dashboard">
      <div className="active-claims">
        {!activeClaimData ? (
          <Skeleton active />
        ) : (
          <>
            <div className="active-claims__title">
              <h2>{activeClaimData.title}</h2>
              {activeClaimData.start_date && activeClaimData.end_date && (
                <time>
                  {activeClaimData.start_date} – {activeClaimData.end_date}
                </time>
              )}
            </div>

            {userData.email_verified_at ? (
              !activeClaimData.estimated_benefit_start && !activeClaimData.estimated_benefit_end ? (
                <div className="active-claims__verify-message">TBC</div>
              ) : (
                <ActiveClaimsCards activeClaimData={activeClaimData} />
              )
            ) : (
              <div>
                Welcome! <b>Verify your email</b> to see approximate benefits
              </div>
            )}
          </>
        )}

        {/* <div className='active-claims__title'>
          <h2>Active claim title</h2>
          <time>01/01/2018 – 31/12/2018</time>
        </div>
        <div className='active-claims__verify-message'>
          Welcome! Verify your email to see approximate benefits
        </div>
        <ActiveClaimsCards /> */}
        <ActiveClaimsSteps link={link} />
      </div>
    </Layout>
  );
};

export default ActiveClaimsPage;
