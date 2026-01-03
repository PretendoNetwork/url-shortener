import fs from 'fs-extra';
import dotenv from 'dotenv';
import { LOG_INFO, LOG_WARN, LOG_ERROR } from '@/logger';
import type mongoose from 'mongoose';
import type Config from '@/types/config';

dotenv.config();

LOG_INFO('Loading config');

const warnings: string[] = [];
const errors: string[] = [];

let mongooseConnectOptionsMain: mongoose.ConnectOptions = {};

if (process.env.PN_URL_SHORTENER_CONFIG_MONGOOSE_CONNECT_OPTIONS_PATH?.trim()) {
	mongooseConnectOptionsMain = fs.readJSONSync(process.env.PN_URL_SHORTENER_CONFIG_MONGOOSE_CONNECT_OPTIONS_PATH?.trim());
} else {
	warnings.push('No Mongoose connection options found for main connection. To add connection options, set PN_URL_SHORTENER_CONFIG_MONGOOSE_CONNECT_OPTIONS_PATH to the path of your options JSON file');
}

export const config: Config = {
	http: {
		port: Number(process.env.PN_URL_SHORTENER_CONFIG_HTTP_PORT?.trim() || '')
	},
	mongoose: {
		connection_string: process.env.PN_URL_SHORTENER_CONFIG_MONGO_CONNECTION_STRING?.trim() || '',
		options: mongooseConnectOptionsMain
	},
	analytics: false
};

LOG_INFO('Config loaded, checking integrity');

if (!config.http.port) {
	errors.push('Failed to find HTTP port. Set the PN_URL_SHORTENER_CONFIG_HTTP_PORT environment variable');
}

if (!config.mongoose.connection_string) {
	errors.push('Failed to find MongoDB connection string. Set the PN_URL_SHORTENER_CONFIG_MONGO_CONNECTION_STRING environment variable');
}

if (process.env.PN_URL_SHORTENER_CONFIG_ANALYTICS) {
	config.analytics = process.env.PN_URL_SHORTENER_CONFIG_ANALYTICS.trim().toLowerCase() === 'true';
}

for (const warning of warnings) {
	LOG_WARN(warning);
}

if (errors.length !== 0) {
	for (const error of errors) {
		LOG_ERROR(error);
	}

	process.exit(0);
}
