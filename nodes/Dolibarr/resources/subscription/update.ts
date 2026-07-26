import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUpdate = {
	resource: ['subscription'],
	operation: ['update'],
};

export const subscriptionUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showOnlyForUpdate },
		options: [
			{
				displayName: 'Amount',
				name: 'amount',
				type: 'number',
				default: 0,
				routing: { send: { type: 'body', property: 'amount' } },
			},
			{
				displayName: 'End Date',
				name: 'datef',
				type: 'dateTime',
				default: '',
				description: 'End date of the subscription period',
				routing: { send: { type: 'body', property: 'datef' } },
			},
			{
				displayName: 'Start Date',
				name: 'dateh',
				type: 'dateTime',
				default: '',
				description: 'Start date of the subscription period',
				routing: { send: { type: 'body', property: 'dateh' } },
			},
		],
	},
];
