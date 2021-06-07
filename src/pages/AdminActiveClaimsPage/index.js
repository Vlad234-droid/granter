import React, { useEffect, useState } from 'react';
import { Skeleton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import AdminActiveClaimsCards from './AdminActiveClaimsCards';
import AdminActiveClaimsSteps from './AdminActiveClaimsSteps';
import LayOutAdmin from '../../components/LayOutAdmin';
import { useHistory } from 'react-router-dom';
import { getActiveClaimData } from '../../core/services';
import { getClaim } from '../../core/adminServices';

import { AdminBackToTablesSVG } from '../../components/icons';

import './style.scss';

const AdminActiveClaimsPage = (props) => {
  const [activeClaimData, setActiveClaimData] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentCompany);
  const userData = useSelector((state) => state.user.data);
  const history = useHistory();

  useEffect(() => {
    getClaim(329).then((data) => {
      setActiveClaimData(() => data);
    });
  }, []);

  return (
    <LayOutAdmin>
      <div className="wrapper_admin_claims">
        <div className="back_to">
          <button
            onClick={() => {
              history.push('/admin/clients');
            }}>
            <div>
              <AdminBackToTablesSVG />
            </div>
            <div className="text_btn">Back to all Michael Cormac Newell</div>
          </button>
        </div>
        <div className="active-claims admin">
          {/*{!activeClaimData ? <Skeleton active /> : <></>}*/}

          {/* <div className='active-claims__title'>
          <h2>Active claim title</h2>
          <time>01/01/2018 – 31/12/2018</time>
        </div>
        <div className='active-claims__verify-message'>
          Welcome! Verify your email to see approximate benefits
        </div>
        <ActiveClaimsCards /> */}
          <AdminActiveClaimsSteps />
        </div>
      </div>
    </LayOutAdmin>
  );
};

export default AdminActiveClaimsPage;
