/* eslint-disable no-unused-labels */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-extra-parens */
import React, { MutableRefObject, useRef } from 'react';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi';
import { useTransition } from 'react-spring';
import { IToast, useToast } from '../../hooks/ToastHook';
import { Container, Toast, Timer } from './Toast.styles';

interface IToastComponentProps {
	toasts: IToast[];
}

const icons = {
	info: <FiInfo size={24} />,
	error: <FiAlertCircle size={24} />,
	success: <FiCheckCircle size={24} />,
};

const ToastComponent: React.FC<IToastComponentProps> = ({ toasts }) => {
	const { removeToast } = useToast();
	const progress = useRef<MutableRefObject<HTMLProgressElement>>();
	const toastsWithTransitions = useTransition(toasts, {
		from: { right: '-100%', opacity: 0 },
		enter: { right: '0%', opacity: 1 },
		leave: { right: '-100%', opacity: 0 },
		config: { duration: 300 },
		keys: (toast: IToast) => toast.id,
	});

	return (
		<Container>
			{toastsWithTransitions((style, item) => (
				<Toast
					key={item.id}
					type={item.type}
					$hasDescription={!!item.description}
					style={{ ...style }}>
					{icons[item.type || 'info']}
					<div>
						<strong>{item.title}</strong>
						<p>{item?.description}</p>
						<Timer durationMs={item.timer}></Timer>
					</div>
					<button type="button" onClick={() => removeToast(item.id)}>
						<FiXCircle size={18}></FiXCircle>
					</button>
				</Toast>
			))}
		</Container>
	);
};

export default ToastComponent;
