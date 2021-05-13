import React, {useEffect, useState} from 'react';
import {Skeleton} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import Layout from '../../components/LayoutDashboard/Layout';
import ActiveClaimsCards from './ActiveClaimsCards';
import ActiveClaimsSteps from './ActiveClaimsSteps';

import {getActiveClaimData} from '../../core/services';

import './style.scss';

const ActiveClaimsPage = (props) => {
	const [activeClaimData, setActiveClaimData] = useState(null);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.currentCompany);

	useEffect(() => {
		if (user) {
			console.log('userId', user.id);
			getActiveClaimData(dispatch, user.id).then((data) => {
				const result = {
					...data,
					startDate: `01/01/${new Date(data.created_at).getFullYear()}`,
					endDate: `31/12/${new Date(data.created_at).getFullYear()}`,
				};
				setActiveClaimData(result);
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
							<time>
								{activeClaimData.startDate} – {activeClaimData.endDate}
							</time>
						</div>
						{!user.email_verified_at ? (
							<div className="active-claims__verify-message">
								Welcome! Verify your email to see approximate benefits
							</div>
						) : (
							<ActiveClaimsCards />
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
				<ActiveClaimsSteps />
			</div>
		</Layout>
	);
};

export default ActiveClaimsPage;
