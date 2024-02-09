/* eslint-disable no-extra-parens */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { HtmlHTMLAttributes, createContext, useCallback, useContext, useState } from 'react';
import ToastComponent from '../components/Toast/Toast.component';

interface IToastContext {
	addToast(list: Omit<IToast, 'id'>): JSX.Element[];
	removeToast(id: string): void;
}

export interface IToast {
	id: string;
	type?: 'info' | 'success' | 'error';
	title: string;
	description?: string;
	timer?: number;
}

const ToastContext = createContext({} as IToastContext);

const ToastProvider: React.FC<HtmlHTMLAttributes<HTMLDivElement>> = ({ children }) => {
	const [toastList, setToastList] = useState<IToast[]>([]);

	const addToast = useCallback(
		({ type, title, description }: Omit<IToast, 'id'>) => {
			const toast = {
				id: self.crypto.randomUUID(),
				type,
				title,
				description,
				timer: 5000,
			} as IToast;

			setToastList((state) => [...state, toast]);
			setTimeout(() => {
				removeToast(toast.id);
			}, toast.timer);
		},
		[toastList]
	);

	const removeToast = useCallback(
		(id: string) => {
			setToastList((state) => state.filter((ele) => ele.id !== id));
		},
		[toastList]
	);

	return (
		<ToastContext.Provider value={{ addToast, removeToast } as IToastContext}>
			{children}
			<ToastComponent toasts={toastList}></ToastComponent>
		</ToastContext.Provider>
	);
};

function useToast(): IToastContext {
	const context = useContext(ToastContext);

	if (!context) {
		throw new Error('Toast must be used within a ToastProvider');
	}
	return context;
}

export { ToastProvider, useToast };
