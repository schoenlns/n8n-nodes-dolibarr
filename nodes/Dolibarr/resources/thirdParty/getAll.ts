import type { INodeProperties } from 'n8n-workflow';
import { paginationProperties, listFilters } from '../../shared/descriptions';

export const thirdPartyGetManyDescription: INodeProperties[] = [
	...paginationProperties('thirdParty'),
	listFilters('thirdParty'),
];
