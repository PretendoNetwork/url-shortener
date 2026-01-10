import express from 'express';
import morgan from 'morgan';
import { config } from '@/config-manager';
import * as database from '@/database';
import RequestException from '@/request-exception';
import { LOG_INFO, LOG_SUCCESS } from '@/logger';
import type { HydratedLinkDocument } from '@/types/mongoose/link';

process.title = 'Pretendo - URL Shortener';

const app = express();

LOG_INFO('Setting up Middleware');
app.use(morgan('dev'));

LOG_INFO('Creating redirect handler');
app.get('/:id', async (request, response) => {
	const linkId = request.params.id;

	let link: HydratedLinkDocument | null;

	if (config.analytics) {
		link = await database.getLinkAndUpHits(linkId);
	} else {
		link = await database.getLink(linkId);
	}

	if (!link) {
		// Dynamic error code URL redirection so we don't have to store every error code link in the database
		const isErrorCode = linkId.match(/^[0-9]{1,6}-[0-9]{1,6}$/);
		if (isErrorCode) {
			const finalUrl = config.error_code_url.replace('{code}', linkId);
			response.redirect(302, finalUrl);
			return;
		}

		response.sendStatus(404);
		return;
	}

	// Use temporary redirect to allow the links to be changed without caching
	response.redirect(302, link.url);
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
