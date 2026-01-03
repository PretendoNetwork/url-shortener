import mongoose from 'mongoose';
import { config } from '@/config-manager';
import { Link } from '@/models/link';
import type { HydratedLinkDocument } from '@/types/mongoose/link';

const connection_string: string = config.mongoose.connection_string;
const options: mongoose.ConnectOptions = config.mongoose.options;

let _connection: mongoose.Connection;

export async function connect(): Promise<void> {
	await mongoose.connect(connection_string, options);

	_connection = mongoose.connection;
	_connection.on('error', console.error.bind(console, 'connection error:'));
}

export function connection(): mongoose.Connection {
	return _connection;
}

export function verifyConnected(): void {
	if (!connection()) {
		throw new Error('Cannot make database requets without being connected');
	}
}

export function getLink(id: string): Promise<HydratedLinkDocument | null> {
	verifyConnected();

	return Link.findOne({ id });
}

export function getLinkAndUpHits(id: string): Promise<HydratedLinkDocument | null> {
	verifyConnected();

	return Link.findOneAndUpdate({ id }, {
		$inc: {
			hits: 1
		}
	});
}
