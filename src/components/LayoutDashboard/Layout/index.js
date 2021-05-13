import React from 'react';
import {Layout} from 'antd';
import Aside from '../Aside';
import Header from '../Header';
import {useDispatch, useSelector} from 'react-redux';

import './style.scss';

const LayoutBoard = ({children, className}) => {
	const dispatch = useDispatch();
	const {visibleModal} = useSelector((state) => state.modal);
	return (
		<div
			className={`app-dashboard ${className}`}
			style={{filter: visibleModal ? 'blur(3px)' : 'blur(0px)'}}
		>
			<Aside />
			<Header />
			<Layout.Content className="main-content">
				<div className="dashboard-wrapper">{children}</div>
			</Layout.Content>
		</div>
	);
};

export default LayoutBoard;
