import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ButtonProps {
	$isDisabled: boolean;
}

export const Container = styled.button<ButtonProps>`
	background: #ff9000;
	color: #312e38;
	height: 56px;
	border-radius: 10px;
	border: 0;
	padding: 0 16px;
	width: 100%;
	font-weight: 500;
	margin-top: 16px;
	transition: background-color 0.2s;

	&:hover {
		background: ${shade(0.2, '#ff9000')};
	}

	${(props) =>
		props.$isDisabled &&
		css`
			background: ${shade(0.5, '#ff9000')};
			cursor: not-allowed;
			&:hover {
				background: ${shade(0.5, '#ff9000')};
			}
		`}
`;
