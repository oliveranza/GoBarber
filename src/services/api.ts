import axios from 'axios';

export interface GoStackError {
	response: {
		data: {
			code: string;
			status: string;
			description: string;
		};
	};
}

const api = axios.create({
	baseURL: 'http://localhost:3333',
});

export default api;
