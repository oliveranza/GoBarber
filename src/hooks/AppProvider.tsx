/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { HtmlHTMLAttributes, createContext } from 'react';
import { AuthProvider } from './AuthHook';
import { ToastProvider } from './ToastHook';

const Context = createContext({});

const AppProvider: React.FC<HtmlHTMLAttributes<HTMLDivElement>> = ({ children }) => {
	return (
		<Context.Provider value={{}}>
			<ToastProvider>
				<AuthProvider>{children}</AuthProvider>
			</ToastProvider>
		</Context.Provider>
	);
};

export default AppProvider;
