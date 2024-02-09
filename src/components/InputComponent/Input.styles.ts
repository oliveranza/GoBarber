import styled, { css } from 'styled-components';
import Tooltip from '../TooltipComponent/Tooltip.component';

interface ContainerProps {
	$isFocused: boolean;
	$isFilled: boolean;
	$haserror?: boolean;
}

export const Container = styled.div<ContainerProps>`
	background: #232129;
	border-radius: 10px;
	border: 2px solid #232129;
	padding: 16px;
	width: 91%;
	color: #666360;
	display: flex;
	align-items: center;

	& + div {
		margin-top: 8px;
	}

	${(props) =>
		props.$isFilled &&
		css`
			color: #00ff44;
		`}
	${(props) =>
		props.$isFocused &&
		css`
			color: #ff9000;
			border: 2px solid #ff9000;
		`}
			${(props) =>
		props.$haserror &&
		css`
			color: #c53030;
			border: 2px solid #c53030;
		`}

	input {
		color: #f4ede8;
		background-color: transparent !important;
		border: 0;
		flex: 1;

		::placeholder {
			color: #666360;
		}
	}

	svg {
		margin-right: 16px;
		min-width: 20px;
		min-height: 20px;
	}
`;

export const Error = styled(Tooltip)`
	height: 20px;
	margin-left: 16px;

	svg {
		margin: 0;
	}

	span {
		background: #c53030;
		color: #fff;

		&::before {
			border-color: #c53030 transparent;
		}
	}
`;
