import type { INodeProperties } from 'n8n-workflow';
import { idField } from '../../shared/descriptions';

export const subscriptionGetDescription: INodeProperties[] = [
	{
		...idField('Subscription', 'subscriptionId'),
		displayOptions: {
			show: { resource: ['subscription'], operation: ['get', 'update', 'delete'] },
		},
	},
];
