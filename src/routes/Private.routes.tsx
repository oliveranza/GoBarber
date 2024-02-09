import { Navigate } from 'react-router';
import { useAuth } from '../hooks/AuthHook';

interface PrivateRouteProps {
	children: React.ReactElement<any, any>;
	escapeRoute?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
	children,
	escapeRoute = '/signin',
}): React.ReactElement<any, any> => {
	const { user } = useAuth();
	return user ? children : <Navigate to={escapeRoute} replace />;
};

export default PrivateRoute;
