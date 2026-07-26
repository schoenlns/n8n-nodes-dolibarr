import type { INodeProperties } from 'n8n-workflow';
import { thirdPartySelect } from '../../shared/descriptions';

export const thirdPartyGetDescription: INodeProperties[] = [
	{
		...thirdPartySelect,
		displayOptions: { show: { resource: ['thirdParty'], operation: ['get', 'update', 'delete'] } },
	},
];
