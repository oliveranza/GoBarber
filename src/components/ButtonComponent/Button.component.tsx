import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './Button.styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, disabled, ...rest }) => {
	return (
		<>
			<Container disabled={disabled} $isDisabled={disabled || false} {...rest}>
				{children}
			</Container>
		</>
	);
};

export default Button;
