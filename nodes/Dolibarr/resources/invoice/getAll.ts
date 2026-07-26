import type { INodeProperties } from 'n8n-workflow';
import { paginationProperties, listFilters } from '../../shared/descriptions';

export const invoiceGetManyDescription: INodeProperties[] = [
	...paginationProperties('invoice'),
	listFilters('invoice'),
];
