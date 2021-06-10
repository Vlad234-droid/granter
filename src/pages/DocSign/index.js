import React from 'react';
import Layout from '../../components/LayoutGuest/Layout';
import './style.scss';

const DocSign = () => {
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
          Contact our Manager <strong>John Smith</strong>
        </p>
        <div className="wrapper_blocks">
          <div className="block_email">
            <span>Email:</span>
            <span>JohnSmith@gmail.com</span>
          </div>
          <div className="block_phone">
            <span>Phone:</span>
            <span>47809485980</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DocSign;
