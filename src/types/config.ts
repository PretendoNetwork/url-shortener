import type { ConnectOptions } from 'mongoose';

interface Config {
	http: {
		port: number;
	};
	mongoose: {
		connection_string: string;
		options: ConnectOptions;
	};
	analytics: boolean;
	error_code_url: string;
}

export default Config;
