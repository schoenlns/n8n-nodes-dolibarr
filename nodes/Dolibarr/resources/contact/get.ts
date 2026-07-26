import type { INodeProperties } from 'n8n-workflow';
import { idField } from '../../shared/descriptions';

export const contactGetDescription: INodeProperties[] = [
	{
		...idField('Contact', 'contactId'),
		displayOptions: {
			show: { resource: ['contact'], operation: ['get', 'update', 'delete'] },
		},
	},
];
