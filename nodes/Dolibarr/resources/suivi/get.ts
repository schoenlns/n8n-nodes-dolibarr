import type { INodeProperties } from 'n8n-workflow';
import { idField } from '../../shared/descriptions';

export const suiviGetDescription: INodeProperties[] = [
	{
		...idField('Follow-Up ID', 'suiviId'),
		displayOptions: {
			show: { resource: ['suivi'], operation: ['get', 'update', 'delete'] },
		},
	},
];
