import React, { useEffect, useState } from 'react';
import { Skeleton, Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AdminActiveClaimsCards from './AdminActiveClaimsCards';
import AdminActiveClaimsSteps from './AdminActiveClaimsSteps';
import LayOutAdmin from '../../components/LayOutAdmin';
import { useHistory } from 'react-router-dom';
import { getActiveClaimData } from '../../core/services';
import { getClaim } from '../../core/adminServices';

import { AdminBackToTablesSVG } from '../../components/icons';

import './style.scss';
import AdminActiveClaimsDates from './AdminActiveClaimsDates';

const AdminActiveClaimsPage = (props) => {
  const [activeClaimData, setActiveClaimData] = useState(null);
  const dispatch = useDispatch();
  const prevRout = useSelector((state) => state.user.prevRout);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    getClaim(id).then((data) => {
      setActiveClaimData(() => data);
    });
  }, []);

  const onActiveClaimDataEdit = () => {
    setActiveClaimData(null);
    getClaim(id).then((data) => {
      setActiveClaimData(() => data);
    });
  };

  return (
    <LayOutAdmin>
      <div className="wrapper_admin_claims">
        <div className="back_to">
          <button
            onClick={() => {
              // history.push('/admin/clients');
              if (prevRout.includes('admin/clients') || prevRout.includes('admin/client/')) {
                history.goBack();
              } else {
                history.push('/admin/clients');
              }
            }}>
            <div>
              <AdminBackToTablesSVG />
            </div>
            <div className="text_btn">Back</div>
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
          {activeClaimData ? (
            <AdminActiveClaimsCards activeClaimData={activeClaimData} onEdit={onActiveClaimDataEdit} />
          ) : (
            <Skeleton active className="cards-skeleton" />
          )}
          {activeClaimData && <AdminActiveClaimsDates activeClaimData={activeClaimData} />}
          <AdminActiveClaimsSteps />
        </div>
      </div>
    </LayOutAdmin>
  );
};

export default AdminActiveClaimsPage;
