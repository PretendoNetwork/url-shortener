import type { Model, HydratedDocument } from 'mongoose';

export interface ILink {
	id: string;
	url: string;
	hits: number;
}

export interface ILinkMethods {}

interface ILinkQueryHelpers {}

export interface LinkModel extends Model<ILink, ILinkQueryHelpers, ILinkMethods> {}

export type HydratedLinkDocument = HydratedDocument<ILink, ILinkMethods>;
