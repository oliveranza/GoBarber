/* eslint-disable no-extra-parens */
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard/dashboard.component';
import { SignIn } from '../pages/SignIn/signin.component';
import { SignUp } from '../pages/SignUp/signup.component';
import PrivateRoute from './Private.routes';

const MainRoutes: React.FC = () => (
	<Routes>
		<Route path="/" element={<Navigate to={'/signin'} />} />
		<Route path="/signin" Component={SignIn} />
		<Route path="/signup" Component={SignUp} />
		<Route
			path="/home"
			element={
				<PrivateRoute>
					<Dashboard />
				</PrivateRoute>
			}
		/>
	</Routes>
);
export default MainRoutes;
