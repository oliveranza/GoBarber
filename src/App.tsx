import React, { BrowserRouter } from 'react-router-dom';

import AppProvider from './hooks/AppProvider';
import MainRoutes from './routes/Main.routes';
import GlobaStyle from './styles/global';

export default function App() {
	return (
		<AppProvider>
			<GlobaStyle />
			<BrowserRouter>
				<MainRoutes />
			</BrowserRouter>
		</AppProvider>
	);
}
