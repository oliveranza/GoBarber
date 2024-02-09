/* eslint-disable @typescript-eslint/ban-types */
import { useState } from 'react';

interface debounceProps {
	id: string;
	delayId?: NodeJS.Timeout;
}

export function useDebounce(delay = 500) {
	const [debounce, setDebounce] = useState<debounceProps[]>([{ id: '0' }]);
	return (id: string, callback: Function) => {
		const debouceProp = { id } as debounceProps;
		let index = debounce.findIndex((ele) => ele.id === id);
		if (index < 0) {
			setDebounce([debouceProp, ...debounce]);
			index = 0;
		}

		if (debounce[index].delayId) {
			clearTimeout(debounce[index].delayId);
		}
		const newDelayId = setTimeout(() => {
			callback();
		}, delay);
		debounce[index].delayId = newDelayId;
	};
}
