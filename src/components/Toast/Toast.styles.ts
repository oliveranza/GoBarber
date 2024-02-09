import { animated } from 'react-spring';
import styled, { css } from 'styled-components';
import TimerComponent from './ToastTimer/ToastTimer';

export const Container = styled.div`
	position: absolute;
	right: 0;
	width: -360px;
	top: 0;
	padding: 30px;
	height: fit-content;
	overflow: hidden;
`;

/* ========================================== */

interface ToastParams {
	type?: 'info' | 'success' | 'error';
	$hasDescription: boolean;
}

const toatsType = {
	info: css`
		background: #c8dcff;
		color: #3172b7;
	`,
	success: css`
		background: #c4ffdc;
		color: #27715c;
	`,
	error: css`
		background: #ffc2c2;
		color: #c53030;
	`,
};

/* ========================================== */

export const Toast = styled(animated.div)<ToastParams>`
	width: 360px;
	position: relative;
	padding: 16px 30px 0px 16px;
	border-radius: 10px;
	box-shadow: 2px 2px 8px #00000020;
	display: flex;

	${(props) => toatsType[props.type || 'info']}

	& + div {
		margin-top: 8px;
	}

	> svg {
		margin: 4px 12px 0 0;
	}

	div {
		flex: 1;

		p {
			margin-top: 4px;
			font-size: 14px;
			opacity: 0.8;
			line-height: 20px;
		}
	}

	button {
		position: absolute;
		right: 16px;
		top: 19px;
		opacity: 0.6;
		border: 0;
		background: transparent;
		color: inherit;
	}

	${(props) =>
		!props.$hasDescription &&
		css`
			align-items: center;

			svg {
				margin-top: 2px;
			}
		`}
`;

export const Timer = styled(TimerComponent)``;
