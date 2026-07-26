import type { INodeProperties } from 'n8n-workflow';
import { paginationProperties, listFilters } from '../../shared/descriptions';

export const contactGetManyDescription: INodeProperties[] = [
	...paginationProperties('contact'),
	listFilters('contact'),
];
