import React, { useEffect } from 'react';
import Layout from '../../components/LayoutGuest/Layout';
import './style.scss';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchProfileData } from '../../core/services/ProfileServices';

const DocSign = () => {
  const history = useHistory();

  useEffect(() => {
    fetchProfileData().then((data) => {
      if (!!data?.profile?.id_status) {
        history.push('/active-claims');
      }
    });
  }, []);

  const { manager } = useSelector((state) => state?.user?.data);

  return (
    <Layout isLogged={false} className="hello-page" mode="registration">
      <div className="wrapper_doc">
        <h2>Final step</h2>
        <p className="text">
          In order to start the claim process please book a meeting with one of our business developers who will be able
          to take you through the steps required to begin our standard consulting terms and claim process.
          <br /> We will want a schedule a call button here.
        </p>
        <p className="manager_info">
          Contact our Manager <strong>{manager.name}</strong>
        </p>
        <div className="wrapper_blocks">
          <div className="block_email">
            <span>Email:</span>
            <span>{manager.email}</span>
          </div>
          <div className="block_phone">
            <span>Phone:</span>
            <span>{manager.phone}</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DocSign;
