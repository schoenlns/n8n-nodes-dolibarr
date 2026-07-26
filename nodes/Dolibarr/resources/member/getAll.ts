import type { INodeProperties } from 'n8n-workflow';
import { paginationProperties, listFilters } from '../../shared/descriptions';

export const memberGetManyDescription: INodeProperties[] = [
	...paginationProperties('member'),
	listFilters('member'),
];
