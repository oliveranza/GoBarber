import React from 'react';
import { Container } from './Tooltip.styles';

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
	titulo: string;
	className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ titulo, className = '', children }) => {
	return (
		<>
			<Container className={className}>
				{children}
				<span>{titulo}</span>
			</Container>
		</>
	);
};

export default Tooltip;
