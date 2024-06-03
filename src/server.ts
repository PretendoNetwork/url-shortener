process.title = 'Pretendo - URL Shortener';

import express from 'express';
import morgan from 'morgan';
import { config } from '@/config-manager';
import * as database from '@/database';
import RequestException from '@/request-exception';
import { LOG_INFO, LOG_SUCCESS } from '@/logger';
import type { HydratedLinkDocument } from '@/types/mongoose/link';

const app = express();

LOG_INFO('Setting up Middleware');
app.use(morgan('dev'));

LOG_INFO('Creating redirect handler');
app.get('/:id', async (request, response) => {
	let link: HydratedLinkDocument | null;

	if (config.analytics) {
		link = await database.getLinkAndUpHits(request.params.id);
	} else {
		link = await database.getLink(request.params.id);
	}

	if (!link) {
		response.sendStatus(404);
		return;
	}

	response.redirect(301, link.url);
});

LOG_INFO('Creating 404 status handler');
app.use((_request, response) => {
	response.sendStatus(404);
});

LOG_INFO('Creating non-404 status handler');
app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
	let status: number = 500;
	let message: string = 'Unknown error';

	if (error instanceof RequestException) {
		status = error.status;
		message = error.message;
	}

	response.status(status);
	response.send(message);
});

async function main(): Promise<void> {
	LOG_INFO('Starting server');

	await database.connect();
	LOG_SUCCESS('Database connected');

	app.listen(config.http.port, () => {
		LOG_SUCCESS(`HTTP server started on port ${config.http.port}`);
	});
}

main().catch(console.error);