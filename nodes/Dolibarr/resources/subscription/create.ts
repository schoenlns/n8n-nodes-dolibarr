import type { INodeProperties } from 'n8n-workflow';
import { memberSelect } from '../../shared/descriptions';

const showOnlyForAdd = {
	resource: ['subscription'],
	operation: ['add'],
};

export const subscriptionAddDescription: INodeProperties[] = [
	{
		// Used in the request URL (/members/{memberId}/subscriptions), not in the body.
		...memberSelect,
		description: 'Member the subscription belongs to',
		displayOptions: { show: showOnlyForAdd },
	},
	{
		displayName: 'Start Date',
		name: 'start_date',
		type: 'dateTime',
		default: '',
		required: true,
		description: 'Start date of the subscription period',
		displayOptions: { show: showOnlyForAdd },
		routing: { send: { type: 'body', property: 'start_date' } },
	},
	{
		displayName: 'End Date',
		name: 'end_date',
		type: 'dateTime',
		default: '',
		required: true,
		description: 'End date of the subscription period',
		displayOptions: { show: showOnlyForAdd },
		routing: { send: { type: 'body', property: 'end_date' } },
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'number',
		default: 0,
		required: true,
		description: 'Subscription amount',
		displayOptions: { show: showOnlyForAdd },
		routing: { send: { type: 'body', property: 'amount' } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showOnlyForAdd },
		options: [
			{
				displayName: 'Label',
				name: 'label',
				type: 'string',
				default: '',
				description: 'Label/description of the subscription',
				routing: { send: { type: 'body', property: 'label' } },
			},
		],
	},
];
