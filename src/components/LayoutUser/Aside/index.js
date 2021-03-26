import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Menu, Modal, Button } from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";

import "./style.scss";

const { SubMenu, Item } = Menu;

export default function Aside() {
  let location = useLocation();

  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);
  const history = useHistory();

  return <h1>ASIDE</h1>;
}
