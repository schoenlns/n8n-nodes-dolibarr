import type { INodeProperties } from 'n8n-workflow';
import { idField } from '../../shared/descriptions';

export const memberGetDescription: INodeProperties[] = [
	{
		...idField('Member', 'memberId'),
		displayOptions: {
			show: { resource: ['member'], operation: ['get', 'update', 'delete'] },
		},
	},
];
