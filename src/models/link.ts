import mongoose from 'mongoose';
import type { ILink, ILinkMethods, LinkModel } from '@/types/mongoose/link';

const LinkSchema = new mongoose.Schema<ILink, LinkModel, ILinkMethods>({
	id: {
		type: String,
		index: true,
		unique: true
	},
	url: {
		type: String,
		index: true
	},
	hits: {
		type: Number,
		default: 0
	}
}, { id: false });

export const Link: LinkModel = mongoose.model<ILink, LinkModel>('Link', LinkSchema);