import React, { useEffect, useState } from "react";
import { Form, Button, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Layout from "../../components/LayoutUser/Layout";

import services from "../../core/services";

import "./style.scss";

const { fetchLogin } = services;

const DashboardPage = (props) => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const onFinish = (values) => {
    setLoader(true);
    fetchLogin(dispatch, values)
      .then((data) => {
        console.log(data);
        setLoader(false);
      })
      .catch(() => {
        setLoader(false);
      });
  };

  return (
    <Layout isLogged={false} className='dashboard'>
      <div className='login-page__wrapper'>
        {/* <h1>Hello dashbuard</h1> */}
      </div>
    </Layout>
  );
};

export default DashboardPage;
