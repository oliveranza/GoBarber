import React from 'react';
import { useAuth } from '../../hooks/AuthHook';

export const Dashboard: React.FC = () => {
	const { signOut } = useAuth();
	return (
		<>
			<h1>Dashboard</h1>
			<button onClick={() => signOut()}>Logout</button>
		</>
	);
};
