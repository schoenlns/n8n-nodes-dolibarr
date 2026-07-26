import type { INodeProperties } from 'n8n-workflow';
import { paginationProperties, listFilters } from '../../shared/descriptions';

export const productGetManyDescription: INodeProperties[] = [
	...paginationProperties('product'),
	listFilters('product'),
];
