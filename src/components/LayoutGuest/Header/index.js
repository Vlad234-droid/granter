// import { Button } from "antd";
import React from 'react';
import {Link} from 'react-router-dom';

import headerLogo from '../../../assets/img/header-logo.svg';

import './style.scss';

const Header = ({mode}) => {
	return (
		<header>
			<div className="wrapper">
				<Link to="/" className="header__logo">
					<img src={headerLogo} alt="" />
					<span>Granter</span>
				</Link>
				{mode === 'login' && (
					<Link to="/" className="header__sign-in ant-btn ant-btn-primary">
						Sign Up
					</Link>
				)}
				{mode === 'registration' && (
					<Link
						to="/sign-in/"
						className="header__sign-in ant-btn ant-btn-primary"
					>
						Log In
					</Link>
				)}
			</div>
		</header>
	);
};

export default Header;
