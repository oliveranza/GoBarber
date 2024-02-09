/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { HtmlHTMLAttributes, createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';
import { UserData } from '../models/UserData.model';
import { Credentials } from '../models/Credentials.model';
import { IAuthContext } from '../models/AuthContext.interaface';

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<HtmlHTMLAttributes<HTMLDivElement>> = ({ children }) => {
	const [data, setData] = useState<UserData>(() => {
		const token = sessionStorage.getItem('@GoBarber:token');
		const user = sessionStorage.getItem('@GoBarber:user');
		if (token && user) {
			return { token, user: JSON.parse(user) };
		}
		return {} as UserData;
	});

	const signIn = useCallback(async ({ email, password }: Credentials): Promise<UserData> => {
		const response = await api.post<UserData>('/sessions', {
			email,
			password,
		});
		const { token, user } = response.data;
		sessionStorage.setItem('@GoBarber:token', token);
		sessionStorage.setItem('@GoBarber:user', JSON.stringify(user));
		setData(response.data);
		return response.data;
	}, []);

	const signOut = useCallback(() => {
		console.log('sign out');

		sessionStorage.removeItem('@GoBarber:token');
		sessionStorage.removeItem('@GoBarber:user');
		setData({} as UserData);
	}, []);

	return (
		<AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};

function useAuth(): IAuthContext {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}

export { AuthProvider, useAuth };
