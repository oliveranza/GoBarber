/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const ToastTimerComponent = ({ durationMs }) => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const updateIntervalMs = 10;
		const totalIntervals = durationMs / updateIntervalMs;
		let currentInterval = 0;

		const intervalId = setInterval(() => {
			const newProgress = currentInterval / totalIntervals * 100;
			setProgress(newProgress);

			if (currentInterval >= totalIntervals) {
				clearInterval(intervalId);
			} else {
				currentInterval++;
			}
		}, updateIntervalMs);

		return () => clearInterval(intervalId);
	}, [durationMs]);

	return (
		<progress className='barra'
			style={{
				width: '124%',
				position: 'relative',
				margin: '0 0 -7px -49px',
			}}
			color="red"
			value={progress}
			max={100}></progress>
	);
};

export default ToastTimerComponent;
